import json
from chembl_webresource_client.new_client import new_client


TARGETS = [
    'CHEMBL25',
    'CHEMBL325',
    'CHEMBL1937',
    'CHEMBL1829',
    'CHEMBL3524',
    'CHEMBL2563',
    'CHEMBL1865',
    'CHEMBL2716',
    'CHEMBL3192',
    'CHEMBL4145',
    'CHEMBL5103',
    'CHEMBL3310',
]

MOLECULES = [
    'CHEMBL98',
    'CHEMBL99',
    'CHEMBL27759',
    'CHEMBL2018302',
    'CHEMBL483254',
    'CHEMBL1213490',
    'CHEMBL356769',
    'CHEMBL272980',
    'CHEMBL430060',
    'CHEMBL1173445',
    'CHEMBL356066',
    'CHEMBL1914702',
]

activities = new_client.activity
activities.set_format('json')

response = activities.filter(
    target_chembl_id__in=TARGETS, pchembl_value__isnull=False, molecule_chembl_id__in=MOLECULES
)

data = list(response)

with open('data/activities.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)
