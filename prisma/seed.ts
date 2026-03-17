import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const customers = [
    {
      name: 'Alice Johnson',
      email: 'alice.johnson@techcorp.com',
      phone: '+1-555-0101',
      company: 'TechCorp Inc.',
      status: 'active',
      notes: 'Key enterprise client, renewal due Q3',
    },
    {
      name: 'Bob Martinez',
      email: 'bob.martinez@startupxyz.io',
      phone: '+1-555-0102',
      company: 'StartupXYZ',
      status: 'lead',
      notes: 'Interested in enterprise plan',
    },
    {
      name: 'Carol Williams',
      email: 'carol.w@designstudio.co',
      phone: '+1-555-0103',
      company: 'Design Studio Co.',
      status: 'active',
      notes: 'Monthly retainer client',
    },
    {
      name: 'David Chen',
      email: 'david.chen@globalfinance.com',
      phone: '+1-555-0104',
      company: 'Global Finance Ltd.',
      status: 'inactive',
      notes: 'Contract ended, potential re-engagement',
    },
    {
      name: 'Emily Thompson',
      email: 'emily.t@mediahub.net',
      phone: '+1-555-0105',
      company: 'MediaHub Networks',
      status: 'lead',
      notes: 'Demo scheduled for next week',
    },
    {
      name: 'Frank Nguyen',
      email: 'frank.nguyen@retailgroup.com',
      phone: '+1-555-0106',
      company: 'Retail Group International',
      status: 'active',
      notes: 'Upgraded to premium last month',
    },
    {
      name: 'Grace Lee',
      email: 'grace.lee@healthplus.org',
      phone: '+1-555-0107',
      company: 'HealthPlus Solutions',
      status: 'lead',
      notes: 'Referred by Alice Johnson',
    },
    {
      name: 'Henry Park',
      email: 'henry.park@logisticsco.com',
      phone: '+1-555-0108',
      company: 'Logistics Co.',
      status: 'inactive',
      notes: 'Budget freeze, revisit in Q4',
    },
    {
      name: 'Isabella Brown',
      email: 'isabella.b@cloudventures.ai',
      phone: '+1-555-0109',
      company: 'Cloud Ventures AI',
      status: 'active',
      notes: 'Power user, excellent feedback',
    },
    {
      name: 'James Wilson',
      email: 'james.wilson@consultpro.biz',
      phone: null,
      company: 'ConsultPro',
      status: 'lead',
      notes: 'Contacted via LinkedIn campaign',
    },
  ]

  for (const customer of customers) {
    await prisma.customer.upsert({
      where: { email: customer.email },
      update: customer,
      create: customer,
    })
  }

  console.log('Seeded 10 customers successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
