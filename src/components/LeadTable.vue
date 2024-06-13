<template>
    <a-table :columns="columns" :dataSource="formattedLeads" rowKey="id">
        <template #status="{ text, record }">
            <span :style="{ color: record.statusColor }">{{ record.statusLabel }}</span>
        </template>
    </a-table>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';

interface Lead {
    id: number;
    name: string;
    status_id: number;
    price: number;
    created_at: string;
    statusLabel: string;
    statusColor: string;
}

export default defineComponent({
    name: 'LeadsTable',
    setup() {
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                sorter: (a: Lead, b: Lead) => a.id - b.id,
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                sorter: (a: Lead, b: Lead) => a.name.localeCompare(b.name),
            },
            {
                title: 'Status',
                dataIndex: 'status_id',
                key: 'status_id',
                slots: { customRender: 'status' },
                sorter: (a: Lead, b: Lead) => a.status_id - b.status_id,
            },
            {
                title: 'Price',
                dataIndex: 'price',
                key: 'price',
                sorter: (a: Lead, b: Lead) => a.price - b.price,
            },
            {
                title: 'Created At',
                dataIndex: 'created_at',
                key: 'created_at',
                sorter: (a: Lead, b: Lead) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
            },
        ];

        const formattedLeads = ref<Lead[]>([]);

        onMounted(async () => {
            try {
                const response = await axios.get<Lead[]>('http://localhost:3003/api/formattedLeads');
                formattedLeads.value = response.data.map(lead => ({
                    ...lead,
                    statusLabel: getStatusLabel(lead.status_id),
                    statusColor: getStatusColor(lead.status_id),
                }));
                console.log('Fetched Leads:', formattedLeads.value);
            } catch (error) {
                console.error('Error fetching formattedLeads:', error);
            }
        });

 
        const getStatusLabel = (statusId: number) => {
            switch (statusId) {
                case 67501602:
                    return 'Первичный контакт';
                case 67501606:
                    return 'Переговоры';
                case 67501610:
                    return 'Принимают решение';
                case 67501614:
                    return 'Согласование договора';
                default:
                    return 'Неизвестный статус';
            }
        };

        const getStatusColor = (statusId: number) => {
            switch (statusId) {
                case 67501602:
                    return 'gray';
                case 67501606:
                    return 'yellow';
                case 67501610:
                    return 'orange';
                case 67501614:
                    return 'red';
                default:
                    return 'black';
            }
        };

        return {
            columns,
            formattedLeads,
        };
    },
});
</script>

<style scoped>

</style>
