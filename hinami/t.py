import requests

page = 2
item = 25
from struct import unpack

byte_start = (page - 1) * item * 4
byte_end = byte_start + item * 4 - 1

headers={
    "Range": f"bytes={byte_start}-{byte_end}",
    "origin": f"http://hitomi.la",
}


re = requests.get("https://ltn.hitomi.la/index-korean.nozomi", headers=headers)
total_items = len(re.content) // 4
print(unpack(f">{total_items}i", bytes(re.content)))
