const { spawn } = require('child_process');
const fs = require('fs');

const child = spawn('npx', ['tsx', 'verify_group_ocr_pipeline.ts'], { shell: true });

child.stdout.on('data', (data) => {
    fs.appendFileSync('out.log', data.toString());
});

child.stderr.on('data', (data) => {
    fs.appendFileSync('err.log', data.toString());
});

child.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});
