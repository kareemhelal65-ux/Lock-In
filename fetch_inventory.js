import fetch from 'node-fetch';

async function main() {
  const userId = '4b74f061-314d-47a8-92a5-f7fc86696acb';
  try {
    const res = await fetch(`http://localhost:3001/api/consumer/user/${userId}/inventory`);
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (e) {
    console.error(e);
  }
}

main();
