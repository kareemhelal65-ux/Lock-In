import urllib.request
import json
import time

API_BASE = 'http://localhost:3001/api'
vendor_id = ''
host_id = ''
friend_id = ''
order_id = ''
expected_total = 300
individual_share = 150

def make_request(url, method='GET', data=None):
    headers = {'Content-Type': 'application/json'}
    req = urllib.request.Request(url, method=method, headers=headers)
    if data:
        req.data = json.dumps(data).encode('utf-8')
    try:
        with urllib.request.urlopen(req) as response:
            return response.status, json.loads(response.read().decode('utf-8'))
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read().decode('utf-8'))
    except Exception as e:
        print(f"Error: {e}")
        return 500, {}

print('🚀 Starting End-to-End Group OCR Verification Pipeline Test\n')

# 1. Setup Data - Fetch a vendor
print('--- 1. Setting up Test Data ---')
status, explore_data = make_request(f'{API_BASE}/consumer/explore')
if not explore_data.get('vendors'):
    print('❌ No vendors found. Database might be empty.')
    exit(1)
vendor_id = explore_data['vendors'][0]['id']
print(f'✅ Selected Vendor: {vendor_id}')

# Create Host User
t = int(time.time() * 1000)
status, host_data = make_request(
    f'{API_BASE}/consumer/signup', 
    method='POST',
    data={'email': f'host_{t}@test.com', 'username': f'host_{t}', 'password': 'password123'}
)
host_id = host_data['user']['id']
print(f'✅ Created Host User: {host_id}')

# Create Friend User
t = int(time.time() * 1000)
status, friend_data = make_request(
    f'{API_BASE}/consumer/signup', 
    method='POST',
    data={'email': f'friend_{t}@test.com', 'username': f'friend_{t}', 'password': 'password123'}
)
friend_id = friend_data['user']['id']
print(f'✅ Created Friend User: {friend_id}')

# 2. Create Group Order
print('\n--- 2. Creating Group Order ---')
order_payload = {
    'userId': host_id,
    'vendorId': vendor_id,
    'totalAmount': expected_total,
    'isCoveredByHost': False,
    'items': [{'name': 'Test Box', 'price': 300, 'quantity': 1}],
    'participants': [
        {'userId': host_id, 'shareAmount': individual_share, 'hasPaid': False},
        {'userId': friend_id, 'shareAmount': individual_share, 'hasPaid': False}
    ]
}

status, order_data = make_request(
    f'{API_BASE}/consumer/order',
    method='POST',
    data=order_payload
)
if status == 201:
    order_id = order_data['order']['id']
    print(f"✅ Created Group Order: {order_id} (Status: {order_data['order']['status']})")
else:
    print(f"❌ Failed to create order: {order_data}")
