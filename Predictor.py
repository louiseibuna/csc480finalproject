import pandas as pd
import twitterscraper as ts
import sys, re, pickle
from datetime import date
from keras.preprocessing.text import Tokenizer
from keras.models import load_model
import numpy as np
from keras.preprocessing import sequence

def create_tweets_lists(dataframe):
    sentences = []
    for index, row in dataframe[['text']].iterrows():
        text = str(row['text'])
        text = re.sub(r'http:\S+', '', text)
        text = re.sub(r'https\S+', '', text)
        text = re.sub(r'www.\S+', '', text)
        text = re.sub(r'pic.twitter\S+', '', text)
        text = re.sub(r'[^\w\s]', '', text).strip().lower()
        if len(text) > 0:
            sentences.append(text)

    return sentences

def predict(model, tokenizer, df):
    tweets = create_tweets_lists(df)
    sequences = tokenizer.texts_to_sequences(tweets)
    test = sequence.pad_sequences(sequences, maxlen=15)
    preds = model.predict_classes(test)
    preds = preds.T[0]
    prediction = np.bincount(preds).argmax()
    return prediction

def main(username):
    tweets = ts.query.query_tweets_from_user(username)
    
    today = str(date.today())
    yr_cutoff = int(today.split('-')[0])
    mo_cutoff = int(today.split('-')[1]) - 3
    day_cutoff = int(today.split('-')[2])

    if(mo_cutoff) < 1:
        mo_cutoff = mo_cutoff + 12
        yr_cutoff = yr_cutoff - 1

    rows = []
    for tweet in tweets:
        year = tweet.timestamp.year
        month = tweet.timestamp.month
        day = tweet.timestamp.day
        if ((int(year) > yr_cutoff) or 
           ((int(year) == yr_cutoff) and (int(month) > mo_cutoff)) or
           ((int(year) == yr_cutoff) and (int(month) == mo_cutoff) and (int(day) >= day_cutoff))):
            if(str(tweet.user) == username):
                row = {}
                row['text'] = tweet.text
                row['user'] = tweet.user
                rows.append(row)

    tweet = pd.DataFrame(rows)
    
    with open('tokenizer.pickle', 'rb') as handle:
        tokenizer = pickle.load(handle)

    model = load_model('95_percent.h5')

    if(len(tweet) < 1):
        print(-1)
    else:
        print("result: " + str(predict(model, tokenizer, tweet)))
    sys.stdout.flush()


if __name__ == "__main__":
   main(sys.argv[1])
