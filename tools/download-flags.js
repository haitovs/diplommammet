const fs = require('fs');
const https = require('https');
const path = require('path');

// Read countries.js to get the list
const countriesFile = path.join(__dirname, '../js/data/countries.js');
const tempFile = path.join(__dirname, 'temp_countries.js');

let countries;
try {
    // Create a temporary module file
    let content = fs.readFileSync(countriesFile, 'utf8');
    content += '\nmodule.exports = COUNTRIES;';
    fs.writeFileSync(tempFile, content);

    // Require the temporary module
    countries = require('./temp_countries.js');
    
    // Clean up
    fs.unlinkSync(tempFile);
} catch (e) {
    console.error("Error loading countries:", e);
    if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
    process.exit(1);
}

const outputDir = path.join(__dirname, '../assets/flags');

if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir, { recursive: true });
}

console.log(`Found ${countries.length} countries. Starting download...`);

const downloadFlag = (code, url) => {
    return new Promise((resolve, reject) => {
        const dest = path.join(outputDir, `${code}.png`);
        
        // Skip if exists
        if (fs.existsSync(dest)) {
            // console.log(`Skipping ${code} - already exists`);
            resolve();
            return;
        }

        // Convert flag emoji or whatever to CDN URL if needed
        // But our local data uses Emoji, so we need to construct the URL from ID
        // URL format: https://flagcdn.com/w320/{code}.png
        const downloadUrl = `https://flagcdn.com/w320/${code.toLowerCase()}.png`;

        const file = fs.createWriteStream(dest);
        https.get(downloadUrl, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download ${code}: ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                process.stdout.write('.'); // Progress dot
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => {});
            reject(err);
        });
    });
};

async function downloadAll() {
    let success = 0;
    let fail = 0;

    // Process in chunks to avoid overwhelming connection
    const chunk = 10;
    for (let i = 0; i < countries.length; i += chunk) {
        const batch = countries.slice(i, i + chunk);
        const promises = batch.map(c => 
            downloadFlag(c.id)
                .then(() => success++)
                .catch(e => {
                    console.error(`\nError ${c.id}:`, e);
                    fail++;
                })
        );
        await Promise.all(promises);
    }
    
    console.log(`\n\nDownload complete!`);
    console.log(`Success: ${success}`);
    console.log(`Failed: ${fail}`);
}

downloadAll();
