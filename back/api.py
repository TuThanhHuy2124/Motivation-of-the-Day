import requests
import random

def get_quote_obj(categories: list):
    category = random.choice(categories)
    api_key = "1qpFcNrVOpbXR7dP8n40Xw==xc9lcaX5HKIHxXbv"
    url = f"https://api.api-ninjas.com/v1/quotes?category={category}"
    response = requests.get(url, headers={"X-Api-Key": api_key})
    if response.status_code == requests.codes.ok:
        quote_response = response.json()
        if len(quote_response) == 1:
            return quote_response[0]
        else:
            raise ValueError("Length of quote object is not 1") 
    else:
        print("Error:", response.status_code, response.text)

#print(get_quote_obj("success"))