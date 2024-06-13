import express from 'express';
import cors from 'cors';
import { Client } from 'amocrm-js';

const app = express();
const port = 3003;

app.use(cors());

async function fetchAmoCrmLeads() {
    const client = new Client({
        domain: 'nselivanov.amocrm.ru',
        auth: {
            client_id: '6f34fce5-d094-4ab0-8253-40394b3a5898',
            client_secret: '5sScxAxE7AEXGjmVsV4qkV0LBmD7a7lprHk1FZghV5jAaiwqduGfwoZ3df6XRLh0',
            redirect_uri: 'https://localhost.com',
            bearer: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImZkMjE1Zjk5NWNkMGE0NGRhYTI1Y2I1YjQyOTFlYzZlZTUyYzkzMDRiMDhlYWQ4NmMyNjYxYWVjOGFkODk5ZDRjOWRjZGYxZTI3ZTA1NjM0In0.eyJhdWQiOiI2ZjM0ZmNlNS1kMDk0LTRhYjAtODI1My00MDM5NGIzYTU4OTgiLCJqdGkiOiJmZDIxNWY5OTVjZDBhNDRkYWEyNWNiNWI0MjkxZWM2ZWU1MmM5MzA0YjA4ZWFkODZjMjY2MWFlYzhhZDg5OWQ0YzlkY2RmMWUyN2UwNTYzNCIsImlhdCI6MTcxODI3MzY2MSwibmJmIjoxNzE4MjczNjYxLCJleHAiOjE3MzE1NDI0MDAsInN1YiI6IjExMTUyMDEwIiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxNzk3MjM0LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiOGRhOTEyMGQtMmJhOS00YmI3LWJmZjktMThjYzVmODE4NTRmIn0.Qv6YhyAbuHLeVaEHkahBmaYPxAZ7dKQpPZWuiRsXB7XwUEva2Q0UXVhGkwtLmhYoFGoLpYeMLQTuDRg9wfcnf-CjLvxUFRZ3fvAEdqd-tWrd6y68Boff-JKyXcZQomF77s4441FahNqiCB3GhT_utX5eRI39YXrMlqAvWOVjJ_SsmSi9SjZHBwb12AHzmaGWkh9CRKd_j368NbWgasIsTvSYdm2uAaMYX3dd7gygp9tujwPBRA0RBVqEDFHMC-WgC9_wVaAqsDhm3-1JT03EzQDi41DQRqyxn9GzsPaBtXbB2dDmDrJLrGazeL0iN_LaKgQ7ecBmtwW3A42ecrN8QQ'
        },
    });

    try {
        const response = await client.request.get('/api/v4/leads');
        const leads = response.data._embedded.leads;

        const formattedLeads = leads.map(lead => ({
            id: lead.id,
            name: lead.name,
            status_id: lead.status_id,
            price: lead.price,
            created_at: new Date(lead.created_at * 1000).toLocaleString(),
        }));

        return formattedLeads;
    } catch (error) {
        console.error('Connection failed:', error);
        return [];
    }
}

app.get('/api/formattedLeads', async (req, res) => {
    const leads = await fetchAmoCrmLeads();
    res.json(leads);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
