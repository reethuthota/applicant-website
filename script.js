// const supabaseUrl = 'https://nzwdhyxjyncysjamcjzz.supabase.co';
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56d2RoeXhqeW5jeXNqYW1janp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUxMjkzMjgsImV4cCI6MjAyMDcwNTMyOH0.J4xwhdheALeSQ2LYCPV_2UMu8TPd2XAiaClskaybwdc';
// const supabase = createClient(supabaseUrl, supabaseKey);
const database = supabase.createClient('https://nzwdhyxjyncysjamcjzz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56d2RoeXhqeW5jeXNqYW1janp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUxMjkzMjgsImV4cCI6MjAyMDcwNTMyOH0.J4xwhdheALeSQ2LYCPV_2UMu8TPd2XAiaClskaybwdc');

async function fetchJobData() {
    const { data, error } = await database
        .from('recruiter_table')
        .select('job_title, company_name, deadline');

    if (error) {
        console.error('Error fetching data:', error.message);
        return [];
    }

    return data;
}

function createCard(jobData) {
    const cardContainer = document.getElementById('cardContainer');

    jobData.forEach((job) => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <h2>${job.job_title}</h2>
            <p>Company: ${job.company_name}</p>
            <p>Deadline: ${job.deadline}</p>
        `;

        const applyButton = document.createElement('button');
        applyButton.innerText = 'Apply';
        applyButton.addEventListener('click', () => {
            applyButtonClickHandler(job.job_title);
        });

        card.appendChild(applyButton);

        card.addEventListener('click', () => {
            window.location.href = `upload.html?job_title=${encodeURIComponent(job.job_title)}`;
        });

        cardContainer.appendChild(card);
    });
}

async function init() {
    const jobData = await fetchJobData();
    createCard(jobData);
}

init();