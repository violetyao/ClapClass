from bs4 import BeautifulSoup
import re
import requests

def construct_url(page):
    return "https://classes.berkeley.edu/search/class?page=" + str(page) + \
           "&f%5B0%5D=im_field_term_name%3A831"

f = open('data', 'a')

for i in range(379):
    result = requests.get(construct_url(i))
    soup = BeautifulSoup(result.content)
    for div in soup.find_all("div", class_=re.compile("handlebarData")):
        f.write(div['data-json'])
        f.write("\n")
    if result.status_code == 200:
        print("Page {0} success!".format(i))
    else:
        raise RuntimeError("Page {0} failed!", i)

f.close()
