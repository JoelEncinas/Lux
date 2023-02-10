import requests
from bs4 import BeautifulSoup

url = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/"

html_content = requests.get(url).text
soup = BeautifulSoup(html_content, "html.parser")

items = []
for link in soup.find_all("a"):
    item = link.get("href")
    if item and item.endswith(".png"):
        items.append(item[:-4])

for item in items:
    print(item)