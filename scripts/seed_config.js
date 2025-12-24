
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function seedConfig() {
    const configs = [
        { key: 'logo_header_svg', value: '', category: 'branding' },
        { key: 'newsletter_text', value: 'The latest in luxury property, lifestyle & culture, curated just for you.', category: 'content' },
        { key: 'newsletter_placeholder', value: 'ENTER YOUR EMAIL', category: 'content' },
        { key: 'footer_disclaimer_1', value: 'The Source of the Displayed Data is Either the Property Owner or Public Record Provided by Non-Governmental Third Parties. It is Believed to be Reliable but Not Guaranteed. For Colorado Viewers, Information About Non-Commercial Properties is Provided Exclusively for Your Personal, Non-Commercial Use.', category: 'legal' },
        { key: 'footer_disclaimer_2', value: ' EQUAL EMPLOYMENT OPPORTUNITY PROVIDER. ALL MATERIAL PRESENTED HEREIN IS INTENDED FOR INFORMATION PURPOSES ONLY. WHILE THIS INFORMATION IS BELIEVED TO BE CORRECT, IT IS REPRESENTED SUBJECT TO ERRORS, OMISSIONS, CHANGES, OR WITHDRAWAL WITHOUT NOTICE. ALL PROPERTY INFORMATION, INCLUDING, BUT NOT LIMITED TO SQUARE FOOTAGE, ROOM COUNT, NUMBER OF BEDROOMS, AND THE SCHOOL DISTRICT IN PROPERTY LISTINGS SHOULD BE VERIFIED BY YOUR OWN ATTORNEY, ARCHITECT, OR ZONING EXPERT. EQUAL HOUSING OPPORTUNITY. LISTING DATA REFRESHED ON NOV 28 2025 AT 11:12 PM.', category: 'legal' },
        { key: 'footer_disclaimer_3', value: 'DOUGLAS ELLIMAN IS A LICENSED REAL ESTATE BROKER IN CALIFORNIA WITH LICENSE # 01947727, COLORADO WITH LICENSE # EC100053892, CONNECTICUT WITH LICENSE # REB.0314827, THE DISTRICT OF COLUMBIA WITH LICENSE # REO40000160, FLORIDA WITH LICENSE # CQ1020232, MARYLAND WITH LICENSE # 645270, MASSACHUSETTS WITH LICENSE # 422764, NEVADA WITH LICENSE # 1454643, NEW JERSEY WITH LICENSE # 0572105, NEW YORK WITH LICENSE # 10991211812, TEXAS WITH LICENSE # 9008706, AND VIRGINIA WITH LICENSE # 0226035659.', category: 'legal' },
        { key: 'footer_powered_by', value: 'POWERED BY PURLIN.AI', category: 'legal' }
    ];

    for (const config of configs) {
        const { data, error } = await supabase
            .from('site_config')
            .upsert(config, { onConflict: 'key' })
            .select();

        if (error) {
            console.error(`Error inserting ${config.key}:`, error);
        } else {
            console.log(`Inserted/Updated ${config.key}:`, data);
        }
    }
}

seedConfig();
