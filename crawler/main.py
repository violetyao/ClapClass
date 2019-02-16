from bs4 import BeautifulSoup
import re
import requests

def construct_url(page):
    return "https://classes.berkeley.edu/search/class?page=" + str(page) + \
           "&f%5B0%5D=im_field_term_name%3A831"

result = requests.get(construct_url(0))
soup = BeautifulSoup(result.content)
i = 0
for div in soup.find_all("div", class_=re.compile("handlebarData")):
    print(div['data-json'])
    print(i)
    i += 1
