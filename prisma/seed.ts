import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding FitKids Staffing database...')

  // Clear existing data in reverse order of dependencies
  await prisma.activityLog.deleteMany({})
  await prisma.notification.deleteMany({})
  await prisma.document.deleteMany({})
  await prisma.agreement.deleteMany({})
  await prisma.payroll.deleteMany({})
  await prisma.attendance.deleteMany({})
  await prisma.invoice.deleteMany({})
  await prisma.placement.deleteMany({})
  await prisma.enquiry.deleteMany({})
  await prisma.pTIApplication.deleteMany({})
  await prisma.pTI.deleteMany({})
  await prisma.school.deleteMany({})
  await prisma.blogPost.deleteMany({})
  await prisma.testimonial.deleteMany({})
  await prisma.fAQ.deleteMany({})
  await prisma.schoolLogo.deleteMany({})
  await prisma.galleryItem.deleteMany({})
  await prisma.siteSetting.deleteMany({})
  await prisma.newsletterSubscriber.deleteMany({})
  await prisma.user.deleteMany({})

  // 1. Users
  const passwordHash = await bcrypt.hash('ChangeMe@123', 10)

  const superAdmin = await prisma.user.create({
    data: {
      name: 'Super Admin',
      email: 'admin@fitkidsstaffing.in',
      hashedPassword: passwordHash,
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  })

  const adminUser = await prisma.user.create({
    data: {
      name: 'Priya Sharma (HR Operations)',
      email: 'hr@fitkidsstaffing.in',
      hashedPassword: passwordHash,
      role: 'ADMIN',
      isActive: true,
    },
  })

  const accountsUser = await prisma.user.create({
    data: {
      name: 'Rohan Meena (Accounts Lead)',
      email: 'accounts@fitkidsstaffing.in',
      hashedPassword: passwordHash,
      role: 'ACCOUNTS',
      isActive: true,
    },
  })

  console.log('Created users')

  // 2. Schools
  const schoolsData = [
    {
      name: 'Delhi Public School, Jaipur',
      principalName: 'Dr. Sunita Kothari',
      phone: '+91 141 238 9001',
      email: 'principal@dpsjaipur.com',
      city: 'Jaipur',
      state: 'Rajasthan',
      board: 'CBSE',
      address: 'NH-8, Bypass Road, Ajmer Road, Jaipur, Rajasthan 302026',
      gstNumber: '08AAAAA0000A1Z5',
      feePerPTI: 35000,
      contractStart: new Date('2024-04-01'),
      contractEnd: new Date('2025-03-31'),
      status: 'ACTIVE',
      logoUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=128&h=128&fit=crop',
      notes: 'Premier CBSE institution. Requires 3 PTIs with focus on athletics and basketball.',
    },
    {
      name: "St. Xavier's Senior Secondary School, Jodhpur",
      principalName: 'Fr. Thomas Anthony',
      phone: '+91 291 254 7890',
      email: 'admin@stxaviersjodhpur.edu.in',
      city: 'Jodhpur',
      state: 'Rajasthan',
      board: 'CBSE',
      address: 'Residency Road, Jodhpur, Rajasthan 342011',
      gstNumber: '08AAABS1234C1Z9',
      feePerPTI: 32000,
      contractStart: new Date('2024-05-01'),
      contractEnd: new Date('2025-04-30'),
      status: 'ACTIVE',
      logoUrl: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=128&h=128&fit=crop',
      notes: 'Excellent sports infrastructure. Strong football culture.',
    },
    {
      name: 'Ryan International School, Udaipur',
      principalName: 'Mrs. Rekha Singhal',
      phone: '+91 294 249 1122',
      email: 'contact@ryanudaipur.org',
      city: 'Udaipur',
      state: 'Rajasthan',
      board: 'CBSE',
      address: 'Sector 5, Hiran Magri, Udaipur, Rajasthan 313002',
      gstNumber: '08AAABR5678D1Z2',
      feePerPTI: 30000,
      contractStart: new Date('2024-06-01'),
      contractEnd: new Date('2025-05-31'),
      status: 'ACTIVE',
      logoUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=128&h=128&fit=crop',
      notes: 'Annual sports meet scheduled in December. Needs yoga coach as well.',
    },
    {
      name: 'Army Public School, Ajmer',
      principalName: 'Col. (Retd.) R. S. Rathore',
      phone: '+91 145 262 4589',
      email: 'apsajmer@armyschools.in',
      city: 'Ajmer',
      state: 'Rajasthan',
      board: 'CBSE',
      address: 'Military Cantonment, Ajmer, Rajasthan 305001',
      gstNumber: '08AAABA9876E1Z1',
      feePerPTI: 28000,
      contractStart: new Date('2024-04-01'),
      contractEnd: new Date('2025-03-31'),
      status: 'ACTIVE',
      logoUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=128&h=128&fit=crop',
      notes: 'High physical discipline expectations. Daily morning drills mandatory.',
    },
    {
      name: 'Mayo College Girls School, Ajmer',
      principalName: 'Ms. Supreet Bakshi',
      phone: '+91 145 266 1234',
      email: 'office@mcgs.ac.in',
      city: 'Ajmer',
      state: 'Rajasthan',
      board: 'CISCE',
      address: 'Mayo Link Road, Ajmer, Rajasthan 305008',
      gstNumber: '08AAABM4321F1Z8',
      feePerPTI: 40000,
      contractStart: new Date('2024-07-01'),
      contractEnd: new Date('2025-06-30'),
      status: 'ACTIVE',
      logoUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=128&h=128&fit=crop',
      notes: 'Elite residential campus. Female PTI instructors preferred with swimming and squash experience.',
    },
    {
      name: 'Neerja Modi School, Jaipur',
      principalName: 'Dr. Indu Dubey',
      phone: '+91 141 278 5480',
      email: 'director@nmsindia.org',
      city: 'Jaipur',
      state: 'Rajasthan',
      board: 'IB/CBSE',
      address: 'Shipra Path, Mansarovar, Jaipur, Rajasthan 302020',
      gstNumber: '08AAABN8765G1Z3',
      feePerPTI: 38000,
      contractStart: new Date('2024-04-01'),
      contractEnd: new Date('2025-03-31'),
      status: 'ACTIVE',
      logoUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=128&h=128&fit=crop',
      notes: 'International curricula alignment. Focus on holistic fitness and student wellness.',
    },
    {
      name: 'Central Academy, Kota',
      principalName: 'Mr. Arvind Saxena',
      phone: '+91 744 242 8890',
      email: 'principal@centralkota.edu.in',
      city: 'Kota',
      state: 'Rajasthan',
      board: 'CBSE',
      address: 'Talwandi, Kota, Rajasthan 324005',
      gstNumber: '08AAABC3456H1Z7',
      feePerPTI: 27000,
      contractStart: new Date('2024-06-15'),
      contractEnd: new Date('2025-05-15'),
      status: 'ACTIVE',
      logoUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=128&h=128&fit=crop',
      notes: 'Active participation in CBSE inter-school cluster games.',
    },
    {
      name: 'Maharaja Sawai Man Singh Vidyalaya, Jaipur',
      principalName: 'Mrs. Krishna Bhati',
      phone: '+91 141 256 0193',
      email: 'msmsv@satyam.net.in',
      city: 'Jaipur',
      state: 'Rajasthan',
      board: 'CBSE',
      address: 'Sawai Ram Singh Road, Jaipur, Rajasthan 302004',
      gstNumber: '08AAABM1122J1Z0',
      feePerPTI: 36000,
      contractStart: null,
      contractEnd: null,
      status: 'PROSPECT',
      logoUrl: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=128&h=128&fit=crop',
      notes: 'In final discussions for 2025 academic session staffing.',
    },
  ]

  const schools = []
  for (const s of schoolsData) {
    const created = await prisma.school.create({ data: s })
    schools.push(created)
  }
  console.log(`Created ${schools.length} schools`)

  // 3. PTIs
  const ptisData = [
    {
      name: 'Rahul Sharma',
      phone: '+91 98290 12345',
      email: 'rahul.pti@fitkidsstaffing.in',
      dateOfBirth: new Date('1994-06-12'),
      qualification: 'BPED',
      experience: 6,
      sportsAchievements: 'National Gold Medalist in 400m Hurdles; State Athletics Coach Level 1',
      preferredCity: 'Jaipur',
      expectedSalary: 24000,
      currentSalary: 24000,
      employmentStatus: 'ACTIVE',
      address: 'Plot 45, Shyam Nagar, Jaipur',
      bankName: 'State Bank of India',
      accountNumber: '38901234567',
      ifscCode: 'SBIN0001234',
      pfNumber: 'RJ/JPR/1098234/001',
      esiNumber: '1410982345',
      policeVerified: true,
      medicalFitness: true,
      performanceNotes: 'Excellent discipline and high student engagement in track events.',
      aadhaarNumber: 'XXXX-XXXX-4589',
      panNumber: 'ABCPS1234D',
    },
    {
      name: 'Vikram Singh Shekhawat',
      phone: '+91 98291 23456',
      email: 'vikram.pti@fitkidsstaffing.in',
      dateOfBirth: new Date('1991-03-24'),
      qualification: 'MPED',
      experience: 9,
      sportsAchievements: 'Represented Rajasthan in Senior National Volleyball; Certified Referee',
      preferredCity: 'Jodhpur',
      expectedSalary: 26000,
      currentSalary: 26000,
      employmentStatus: 'ACTIVE',
      address: '12-B, Ratanada, Jodhpur',
      bankName: 'HDFC Bank',
      accountNumber: '50100456789012',
      ifscCode: 'HDFC0000456',
      pfNumber: 'RJ/JDH/1098235/002',
      esiNumber: '1410982346',
      policeVerified: true,
      medicalFitness: true,
      performanceNotes: 'Senior trainer with outstanding leadership skills.',
      aadhaarNumber: 'XXXX-XXXX-8921',
      panNumber: 'BKFPS4589G',
    },
    {
      name: 'Priyanka Rathore',
      phone: '+91 98292 34567',
      email: 'priyanka.pti@fitkidsstaffing.in',
      dateOfBirth: new Date('1996-08-19'),
      qualification: 'BPED',
      experience: 4,
      sportsAchievements: 'State Basketball Champion; National Netball participant',
      preferredCity: 'Ajmer',
      expectedSalary: 23000,
      currentSalary: 23000,
      employmentStatus: 'ACTIVE',
      address: '22, Civil Lines, Ajmer',
      bankName: 'ICICI Bank',
      accountNumber: '003401567890',
      ifscCode: 'ICIC0000034',
      pfNumber: 'RJ/AJM/1098236/003',
      esiNumber: '1410982347',
      policeVerified: true,
      medicalFitness: true,
      performanceNotes: 'Highly loved by students at Mayo Girls. Promotes female sports participation.',
      aadhaarNumber: 'XXXX-XXXX-6712',
      panNumber: 'CRTPS7890K',
    },
    {
      name: 'Amit Kumar Meena',
      phone: '+91 98293 45678',
      email: 'amit.pti@fitkidsstaffing.in',
      dateOfBirth: new Date('1995-11-05'),
      qualification: 'DPED',
      experience: 5,
      sportsAchievements: 'All-India Inter-University Football player; AFC C-License coach',
      preferredCity: 'Udaipur',
      expectedSalary: 22000,
      currentSalary: 22000,
      employmentStatus: 'ACTIVE',
      address: '8, Goverdhan Vilas, Udaipur',
      bankName: 'Punjab National Bank',
      accountNumber: '1234002100054321',
      ifscCode: 'PUNB0123400',
      pfNumber: 'RJ/UDR/1098237/004',
      esiNumber: '1410982348',
      policeVerified: true,
      medicalFitness: true,
      performanceNotes: 'Superb football drill sessions.',
      aadhaarNumber: 'XXXX-XXXX-3419',
      panNumber: 'DMYPM9012M',
    },
    {
      name: 'Sunita Choudhary',
      phone: '+91 98294 56789',
      email: 'sunita.pti@fitkidsstaffing.in',
      dateOfBirth: new Date('1993-01-30'),
      qualification: 'BPED',
      experience: 7,
      sportsAchievements: 'Yoga Alliance 500-hour certified instructor; State Gymnastics Silver',
      preferredCity: 'Jaipur',
      expectedSalary: 25000,
      currentSalary: 25000,
      employmentStatus: 'ACTIVE',
      address: '104, Malviya Nagar, Jaipur',
      bankName: 'Bank of Baroda',
      accountNumber: '09870100012345',
      ifscCode: 'BARB0MALVIY',
      pfNumber: 'RJ/JPR/1098238/005',
      esiNumber: '1410982349',
      policeVerified: true,
      medicalFitness: true,
      performanceNotes: 'Expert in primary children physical development and mindfulness.',
      aadhaarNumber: 'XXXX-XXXX-9912',
      panNumber: 'EQSPS3344P',
    },
    {
      name: 'Rajesh Verma',
      phone: '+91 98295 67890',
      email: 'rajesh.pti@fitkidsstaffing.in',
      dateOfBirth: new Date('1992-04-14'),
      qualification: 'MPED',
      experience: 8,
      sportsAchievements: 'BCCI Level 1 Cricket Coach; Rajasthan U-19 Squad Trainer',
      preferredCity: 'Jaipur',
      expectedSalary: 26000,
      currentSalary: 26000,
      employmentStatus: 'ACTIVE',
      address: 'Sector 3, Vidyadhar Nagar, Jaipur',
      bankName: 'State Bank of India',
      accountNumber: '31234567890',
      ifscCode: 'SBIN0005678',
      pfNumber: 'RJ/JPR/1098239/006',
      esiNumber: '1410982350',
      policeVerified: true,
      medicalFitness: true,
      performanceNotes: 'Spearheaded inter-school cricket championship wins.',
      aadhaarNumber: 'XXXX-XXXX-1123',
      panNumber: 'FLMPV5566R',
    },
    {
      name: 'Deepak Yadav',
      phone: '+91 98296 78901',
      email: 'deepak.pti@fitkidsstaffing.in',
      dateOfBirth: new Date('1997-09-21'),
      qualification: 'BPED',
      experience: 3,
      sportsAchievements: 'National Kabaddi Tournament player (Bronze medalist)',
      preferredCity: 'Ajmer',
      expectedSalary: 21000,
      currentSalary: 21000,
      employmentStatus: 'ACTIVE',
      address: 'Adarsh Nagar, Ajmer',
      bankName: 'Axis Bank',
      accountNumber: '918010023456789',
      ifscCode: 'UTIB0000918',
      pfNumber: 'RJ/AJM/1098240/007',
      esiNumber: '1410982351',
      policeVerified: true,
      medicalFitness: true,
      performanceNotes: 'Energetic drills and strong athletic base.',
      aadhaarNumber: 'XXXX-XXXX-4421',
      panNumber: 'GDTPY7788T',
    },
    {
      name: 'Pooja Saini',
      phone: '+91 98297 89012',
      email: 'pooja.pti@fitkidsstaffing.in',
      dateOfBirth: new Date('1998-02-15'),
      qualification: 'BPED',
      experience: 2,
      sportsAchievements: 'State Badminton Singles runner-up; Aerobics instructor',
      preferredCity: 'Jaipur',
      expectedSalary: 20000,
      currentSalary: 20000,
      employmentStatus: 'ACTIVE',
      address: 'C-Scheme, Jaipur',
      bankName: 'Kotak Mahindra Bank',
      accountNumber: '4512345678',
      ifscCode: 'KKBK0000123',
      pfNumber: 'RJ/JPR/1098241/008',
      esiNumber: '1410982352',
      policeVerified: true,
      medicalFitness: true,
      performanceNotes: 'Great with junior wing children and rhythmic exercises.',
      aadhaarNumber: 'XXXX-XXXX-7788',
      panNumber: 'HYTPS9900W',
    },
    {
      name: 'Sandeep Bishnoi',
      phone: '+91 98298 90123',
      email: 'sandeep.pti@fitkidsstaffing.in',
      dateOfBirth: new Date('1990-12-08'),
      qualification: 'MPED',
      experience: 10,
      sportsAchievements: 'Former Services Cross Country Runner; NIS Diploma in Athletics',
      preferredCity: 'Jodhpur',
      expectedSalary: 28000,
      currentSalary: 28000,
      employmentStatus: 'ACTIVE',
      address: 'Mandore Road, Jodhpur',
      bankName: 'State Bank of India',
      accountNumber: '20987654321',
      ifscCode: 'SBIN0008899',
      pfNumber: 'RJ/JDH/1098242/009',
      esiNumber: '1410982353',
      policeVerified: true,
      medicalFitness: true,
      performanceNotes: 'Exceptional track coordinator. High parent praise.',
      aadhaarNumber: 'XXXX-XXXX-9901',
      panNumber: 'JSTPB2233Y',
    },
    {
      name: 'Kavita Gurjar',
      phone: '+91 98299 01234',
      email: 'kavita.pti@fitkidsstaffing.in',
      dateOfBirth: new Date('1995-05-18'),
      qualification: 'DPED',
      experience: 4,
      sportsAchievements: 'State Handball Player, Gold Medalist Inter-College tournament',
      preferredCity: 'Kota',
      expectedSalary: 21000,
      currentSalary: 21000,
      employmentStatus: 'ACTIVE',
      address: 'Vigyan Nagar, Kota',
      bankName: 'Bank of India',
      accountNumber: '665510100012345',
      ifscCode: 'BKID0006655',
      pfNumber: 'RJ/KTA/1098243/010',
      esiNumber: '1410982354',
      policeVerified: true,
      medicalFitness: true,
      performanceNotes: 'Very reliable and prompt attendance record.',
      aadhaarNumber: 'XXXX-XXXX-5566',
      panNumber: 'KLRPS4455A',
    },
    {
      name: 'Manoj Jangid',
      phone: '+91 98290 98765',
      email: 'manoj.pti@fitkidsstaffing.in',
      dateOfBirth: new Date('1994-07-25'),
      qualification: 'BPED',
      experience: 5,
      sportsAchievements: 'Table Tennis District Champion; FIDE Rated Chess Coach',
      preferredCity: 'Jaipur',
      expectedSalary: 22000,
      currentSalary: 22000,
      employmentStatus: 'ACTIVE',
      address: 'Vaishali Nagar, Jaipur',
      bankName: 'Yes Bank',
      accountNumber: '01239010000456',
      ifscCode: 'YESB0000123',
      pfNumber: 'RJ/JPR/1098244/011',
      esiNumber: '1410982355',
      policeVerified: true,
      medicalFitness: true,
      performanceNotes: 'Specializes in indoor sports and tactical agility.',
      aadhaarNumber: 'XXXX-XXXX-3344',
      panNumber: 'LMNPJ6677B',
    },
    {
      name: 'Anjali Sharma',
      phone: '+91 98291 87654',
      email: 'anjali.pti@fitkidsstaffing.in',
      dateOfBirth: new Date('1996-10-12'),
      qualification: 'BPED',
      experience: 3,
      sportsAchievements: 'National Kho-Kho representation; Fit India Ambassador',
      preferredCity: 'Jaipur',
      expectedSalary: 21000,
      currentSalary: 0,
      employmentStatus: 'INACTIVE',
      address: 'Mansarovar, Jaipur',
      bankName: 'State Bank of India',
      accountNumber: '34567890123',
      ifscCode: 'SBIN0007890',
      pfNumber: '',
      esiNumber: '',
      policeVerified: true,
      medicalFitness: true,
      performanceNotes: 'Currently available on bench for upcoming school placements.',
      aadhaarNumber: 'XXXX-XXXX-2211',
      panNumber: 'NOPPA8899C',
    },
    {
      name: 'Surendra Singh',
      phone: '+91 98292 76543',
      email: 'surendra.pti@fitkidsstaffing.in',
      dateOfBirth: new Date('1991-01-15'),
      qualification: 'MPED',
      experience: 8,
      sportsAchievements: 'Senior National Wrestling Participant; Functional Fitness Coach',
      preferredCity: 'Bikaner',
      expectedSalary: 25000,
      currentSalary: 0,
      employmentStatus: 'ON_LEAVE',
      address: 'Sadar Bazar, Bikaner',
      bankName: 'Canara Bank',
      accountNumber: '2100101005678',
      ifscCode: 'CNRB0002100',
      pfNumber: '',
      esiNumber: '',
      policeVerified: true,
      medicalFitness: true,
      performanceNotes: 'On medical recovery leave until next term.',
      aadhaarNumber: 'XXXX-XXXX-8877',
      panNumber: 'PQRSB1122D',
    },
    {
      name: 'Ritu Kanwar',
      phone: '+91 98293 65432',
      email: 'ritu.pti@fitkidsstaffing.in',
      dateOfBirth: new Date('1997-04-20'),
      qualification: 'BPED',
      experience: 3,
      sportsAchievements: 'State Level Archery & Shooting Instructor',
      preferredCity: 'Jaipur',
      expectedSalary: 22000,
      currentSalary: 0,
      employmentStatus: 'ACTIVE',
      address: 'Jhotwara, Jaipur',
      bankName: 'ICICI Bank',
      accountNumber: '003401569999',
      ifscCode: 'ICIC0000034',
      pfNumber: '',
      esiNumber: '',
      policeVerified: true,
      medicalFitness: true,
      performanceNotes: 'Certified instructor for modern Olympic precision sports.',
      aadhaarNumber: 'XXXX-XXXX-6655',
      panNumber: 'RSTPK3344E',
    },
    {
      name: 'Pawan Kumar',
      phone: '+91 98294 54321',
      email: 'pawan.pti@fitkidsstaffing.in',
      dateOfBirth: new Date('1992-09-09'),
      qualification: 'DPED',
      experience: 6,
      sportsAchievements: 'State Boxing Bronze Medalist; Self Defense Master Trainer',
      preferredCity: 'Udaipur',
      expectedSalary: 23000,
      currentSalary: 0,
      employmentStatus: 'ACTIVE',
      address: 'Fatehpura, Udaipur',
      bankName: 'HDFC Bank',
      accountNumber: '50100456999888',
      ifscCode: 'HDFC0000456',
      pfNumber: '',
      esiNumber: '',
      policeVerified: true,
      medicalFitness: true,
      performanceNotes: 'Specializes in girl child self-defense bootcamps.',
      aadhaarNumber: 'XXXX-XXXX-4433',
      panNumber: 'TUVPP5566F',
    },
  ]

  const ptis = []
  for (const p of ptisData) {
    const created = await prisma.pTI.create({ data: p })
    ptis.push(created)
  }
  console.log(`Created ${ptis.length} PTIs`)

  // 4. Placements (10 active placements)
  const placementsData = [
    { ptiIndex: 0, schoolIndex: 0, salary: 24000, fee: 35000, start: new Date('2024-04-01') },
    { ptiIndex: 4, schoolIndex: 0, salary: 25000, fee: 35000, start: new Date('2024-04-01') },
    { ptiIndex: 5, schoolIndex: 0, salary: 26000, fee: 35000, start: new Date('2024-04-01') },
    { ptiIndex: 1, schoolIndex: 1, salary: 26000, fee: 32000, start: new Date('2024-05-01') },
    { ptiIndex: 8, schoolIndex: 1, salary: 26000, fee: 32000, start: new Date('2024-05-01') },
    { ptiIndex: 3, schoolIndex: 2, salary: 22000, fee: 30000, start: new Date('2024-06-01') },
    { ptiIndex: 6, schoolIndex: 3, salary: 21000, fee: 28000, start: new Date('2024-04-01') },
    { ptiIndex: 2, schoolIndex: 4, salary: 23000, fee: 40000, start: new Date('2024-07-01') },
    { ptiIndex: 7, schoolIndex: 5, salary: 22000, fee: 38000, start: new Date('2024-04-01') },
    { ptiIndex: 9, schoolIndex: 6, salary: 21000, fee: 27000, start: new Date('2024-06-15') },
  ]

  const placements = []
  for (const pl of placementsData) {
    const created = await prisma.placement.create({
      data: {
        ptiId: ptis[pl.ptiIndex].id,
        schoolId: schools[pl.schoolIndex].id,
        startDate: pl.start,
        salary: pl.salary,
        schoolFee: pl.fee,
        workingDays: 26,
        status: 'ACTIVE',
        notes: `Assigned under standard service terms. Performance reviewed monthly.`,
      },
    })
    placements.push(created)
  }
  console.log(`Created ${placements.length} active placements`)

  // 5. Attendance for Current Month (e.g. October 2026 or 10/2026)
  const currentMonth = 10
  const currentYear = 2026

  for (const pl of placements) {
    // Generate sample attendance records for 26 days
    const records: Record<string, string> = {}
    let presentDays = 0
    let absentDays = 0
    let halfDays = 0
    let leaveDays = 0

    for (let day = 1; day <= 26; day++) {
      const dateStr = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      // Sundays off, mostly present
      if (day % 7 === 0) {
        records[dateStr] = 'PRESENT'
        presentDays += 1
      } else if (day === 12) {
        records[dateStr] = 'LEAVE'
        leaveDays += 1
      } else if (day === 19) {
        records[dateStr] = 'HALF_DAY'
        halfDays += 1
      } else {
        records[dateStr] = 'PRESENT'
        presentDays += 1
      }
    }

    await prisma.attendance.create({
      data: {
        ptiId: pl.ptiId,
        schoolId: pl.schoolId,
        month: currentMonth,
        year: currentYear,
        records: JSON.stringify(records),
        presentDays: presentDays,
        absentDays: absentDays,
        halfDays: halfDays,
        leaveDays: leaveDays,
        approvedAt: new Date(),
      },
    })
  }
  console.log('Created attendance for current month')

  // 6. Payroll records for the last 3 months
  const months = [
    { month: 7, year: 2026 },
    { month: 8, year: 2026 },
    { month: 9, year: 2026 },
  ]

  for (const m of months) {
    for (const pl of placements) {
      const pti = ptis.find((p) => p.id === pl.ptiId)!
      const basic = pl.salary
      const workingDays = 26
      const presentDays = 25
      const absentDeduction = Math.round((basic / workingDays) * 1)
      const earned = basic - absentDeduction
      const pfDeduction = Math.round(earned * 0.12)
      const esiDeduction = Math.round(earned * 0.0075)
      const netSalary = earned - pfDeduction - esiDeduction

      await prisma.payroll.create({
        data: {
          ptiId: pti.id,
          month: m.month,
          year: m.year,
          basicSalary: basic,
          presentDays: presentDays,
          workingDays: workingDays,
          absentDeduction: absentDeduction,
          bonus: m.month === 8 ? 1000 : 0,
          pfDeduction: pfDeduction,
          esiDeduction: esiDeduction,
          otherDeductions: 0,
          netSalary: netSalary + (m.month === 8 ? 1000 : 0),
          status: 'PAID',
          transactionRef: `UPI/NEFT/FKS${m.year}${m.month}${pti.id.slice(-4).toUpperCase()}`,
          paidAt: new Date(m.year, m.month - 1, 30),
          remarks: `Monthly stipend disbursed for ${m.month}/${m.year}`,
        },
      })
    }
  }
  console.log('Created payroll records for last 3 months')

  // 7. Enquiries (10 across pipeline stages)
  const enquiriesData = [
    {
      schoolName: 'Sanskar School, Jaipur',
      contactPerson: 'Mr. Vivek Joshi',
      phone: '+91 98290 88771',
      email: 'admissions@sanskarschool.edu.in',
      city: 'Jaipur',
      board: 'CBSE',
      students: 1800,
      ptisNeeded: 2,
      preferredStart: new Date('2026-11-01'),
      message: 'Looking for 2 experienced PTIs for our middle and senior wings.',
      status: 'NEW',
      source: 'Website',
      notes: 'Initial inquiry via website form. Needs callback regarding salary package.',
    },
    {
      schoolName: 'Seedling Public School, Jaipur',
      contactPerson: 'Mrs. Manju Bakshi',
      phone: '+91 98290 77662',
      email: 'seedling@seedlingschools.org',
      city: 'Jaipur',
      board: 'CBSE',
      students: 2200,
      ptisNeeded: 3,
      preferredStart: new Date('2026-11-15'),
      message: 'Need certified swimming and gymnastics teachers alongside general PTI.',
      status: 'CONTACTED',
      source: 'Google Search',
      notes: 'Called principal on Tuesday. Shared company profile presentation.',
      assignedToId: adminUser.id,
    },
    {
      schoolName: 'Bodhi International School, Jodhpur',
      contactPerson: 'Mr. Arvind Malviya',
      phone: '+91 98290 66553',
      email: 'arvind@bodhischool.com',
      city: 'Jodhpur',
      board: 'IB/CIE',
      students: 1200,
      ptisNeeded: 2,
      preferredStart: new Date('2026-12-01'),
      message: 'Looking for fluent English-speaking PTIs with international athletics training.',
      status: 'DEMO_SCHEDULED',
      source: 'Referral',
      notes: 'Demo class scheduled for 2 candidates on 28th October at their Jodhpur campus.',
      assignedToId: adminUser.id,
      followUpDate: new Date('2026-10-28'),
    },
    {
      schoolName: 'Mewar Girls School, Chittorgarh',
      contactPerson: 'Dr. Pushpa Kanwar',
      phone: '+91 98290 55444',
      email: 'contact@mewargirls.ac.in',
      city: 'Chittorgarh',
      board: 'RBSE',
      students: 950,
      ptisNeeded: 1,
      preferredStart: new Date('2026-11-01'),
      message: 'Urgent requirement for a female PTI instructor.',
      status: 'PROPOSAL_SENT',
      source: 'Website',
      notes: 'Commercial proposal sent for Rs. 26,000/month. Waiting for trust board approval.',
      assignedToId: accountsUser.id,
    },
    {
      schoolName: 'Global International School, Kota',
      contactPerson: 'Mr. Kapil Sharma',
      phone: '+91 98290 44335',
      email: 'admin@globalkota.in',
      city: 'Kota',
      board: 'CBSE',
      students: 1500,
      ptisNeeded: 2,
      preferredStart: new Date('2026-09-01'),
      message: 'Required PTIs for academic year 2026-27.',
      status: 'WON',
      source: 'Campaign',
      notes: 'Contract finalized. Converted to school record.',
      convertedSchoolId: schools[6].id,
    },
    {
      schoolName: 'Heritage Academy, Alwar',
      contactPerson: 'Mr. Naresh Jain',
      phone: '+91 98290 33226',
      email: 'naresh@heritagealwar.com',
      city: 'Alwar',
      board: 'CBSE',
      students: 800,
      ptisNeeded: 1,
      preferredStart: new Date('2026-08-01'),
      message: 'Looking for sports instructor on part-time basis.',
      status: 'LOST',
      source: 'Website',
      notes: 'They opted for a local part-time hire due to budget constraints under 15k.',
    },
    {
      schoolName: 'Birla Public School, Pilani',
      contactPerson: 'Capt. S. K. Mukherjee',
      phone: '+91 159 624 2125',
      email: 'sports@bpspilani.edu.in',
      city: 'Pilani',
      board: 'CBSE',
      students: 2400,
      ptisNeeded: 4,
      preferredStart: new Date('2026-11-20'),
      message: 'Requires 4 specialized coaches: 1 Athletics, 1 Football, 1 Basketball, 1 Yoga.',
      status: 'NEW',
      source: 'Website',
      notes: 'High-value account. Requires top-level screening.',
    },
    {
      schoolName: 'Modern School, Bikaner',
      contactPerson: 'Mrs. Shashi Rathi',
      phone: '+91 151 223 3445',
      email: 'info@modernbikaner.org',
      city: 'Bikaner',
      board: 'CBSE',
      students: 1100,
      ptisNeeded: 1,
      preferredStart: new Date('2026-12-01'),
      message: 'Replacement PTI needed for current teacher retiring in Nov.',
      status: 'CONTACTED',
      source: 'Website',
      notes: 'Sent list of candidate profiles available in Bikaner.',
    },
    {
      schoolName: 'DAV Centenary Public School, Jaipur',
      contactPerson: 'Mr. Sudhir Verma',
      phone: '+91 141 228 1199',
      email: 'davjaipur@davschools.in',
      city: 'Jaipur',
      board: 'CBSE',
      students: 1600,
      ptisNeeded: 2,
      preferredStart: new Date('2026-11-10'),
      message: 'Need 2 PTIs with experience in morning assembly drill & CBSE sports.',
      status: 'DEMO_SCHEDULED',
      source: 'Direct Contact',
      notes: 'Demo session confirmed for Friday 10 AM.',
      assignedToId: adminUser.id,
    },
    {
      schoolName: 'St. Anselm Senior Secondary School, Ajmer',
      contactPerson: 'Fr. Raymond Dsouza',
      phone: '+91 145 242 0987',
      email: 'stanselmajmer@gmail.com',
      city: 'Ajmer',
      board: 'CBSE',
      students: 2000,
      ptisNeeded: 2,
      preferredStart: new Date('2026-11-05'),
      message: 'Annual sports day approaching. In need of 2 drill masters.',
      status: 'PROPOSAL_SENT',
      source: 'Referral',
      notes: 'Quote submitted. Follow up scheduled for Monday.',
      assignedToId: accountsUser.id,
    },
  ]

  for (const enq of enquiriesData) {
    await prisma.enquiry.create({ data: enq })
  }
  console.log(`Created ${enquiriesData.length} enquiries`)

  // 8. PTI Applications (5 in various stages)
  const applicationsData = [
    {
      applicationId: 'APP-2026-001',
      name: 'Harish Chandra Gurjar',
      phone: '+91 97840 11223',
      email: 'harish.gurjar@gmail.com',
      dateOfBirth: new Date('1998-05-14'),
      qualification: 'BPED',
      experience: 3,
      sportsAchievements: 'Inter-College Kho-Kho Captain; District Javelin Champion',
      preferredCity: 'Jaipur',
      expectedSalary: 22000,
      address: 'Tonk Road, Jaipur',
      status: 'PENDING',
      notes: 'Application received online. Degree verification pending.',
    },
    {
      applicationId: 'APP-2026-002',
      name: 'Monika Bhati',
      phone: '+91 97840 22334',
      email: 'monika.bhati@gmail.com',
      dateOfBirth: new Date('1997-09-28'),
      qualification: 'MPED',
      experience: 4,
      sportsAchievements: 'National Netball Player; Certified Aerobics Trainer',
      preferredCity: 'Jodhpur',
      expectedSalary: 25000,
      address: 'Sardarpura, Jodhpur',
      status: 'SHORTLISTED',
      notes: 'Profile screened and marked suitable for girls senior secondary schools.',
    },
    {
      applicationId: 'APP-2026-003',
      name: 'Bhawani Singh Deora',
      phone: '+91 97840 33445',
      email: 'bhawani.deora@gmail.com',
      dateOfBirth: new Date('1993-02-17'),
      qualification: 'BPED',
      experience: 7,
      sportsAchievements: 'Senior State Footballer; NIS Certified Youth Fitness Instructor',
      preferredCity: 'Udaipur',
      expectedSalary: 26000,
      address: 'Sukher, Udaipur',
      status: 'INTERVIEWED',
      interviewDate: new Date('2026-10-22'),
      notes: 'Cleared technical interview with 9/10 score. Demo scheduled next.',
    },
    {
      applicationId: 'APP-2026-004',
      name: 'Kailash Meena',
      phone: '+91 97840 44556',
      email: 'kailash.meena@gmail.com',
      dateOfBirth: new Date('1996-12-04'),
      qualification: 'DPED',
      experience: 4,
      sportsAchievements: 'District Cricket Champion; Taekwondo Red Belt',
      preferredCity: 'Kota',
      expectedSalary: 21000,
      address: 'Dadabari, Kota',
      status: 'DEMO_SCHEDULED',
      demoDate: new Date('2026-10-29'),
      notes: 'Scheduled for school demo at Central Academy Kota on Thursday.',
    },
    {
      applicationId: 'APP-2026-005',
      name: 'Naveen Kumar Jangir',
      phone: '+91 97840 55667',
      email: 'naveen.jangir@gmail.com',
      dateOfBirth: new Date('2001-07-10'),
      qualification: 'OTHER',
      experience: 1,
      sportsAchievements: 'Local gym fitness trainer',
      preferredCity: 'Jaipur',
      expectedSalary: 18000,
      address: 'Sanganer, Jaipur',
      status: 'REJECTED',
      rejectionReason: 'Does not hold NCTE-recognized physical education degree (DPED/BPED/MPED required).',
      notes: 'Advised candidate to complete D.P.Ed diploma first.',
    },
  ]

  for (const app of applicationsData) {
    await prisma.pTIApplication.create({ data: app })
  }
  console.log(`Created ${applicationsData.length} PTI applications`)

  // 9. Invoices (6 mix of statuses)
  const invoicesData = [
    {
      invoiceNumber: 'INV-2026-0801',
      schoolIndex: 0,
      month: 8,
      year: 2026,
      subtotal: 105000,
      cgst: 9450,
      sgst: 9450,
      igst: 0,
      tds: 0,
      total: 123900,
      status: 'PAID',
      notes: 'Paid via RTGS on 5th Sept 2026.',
    },
    {
      invoiceNumber: 'INV-2026-0802',
      schoolIndex: 1,
      month: 8,
      year: 2026,
      subtotal: 64000,
      cgst: 5760,
      sgst: 5760,
      igst: 0,
      tds: 0,
      total: 75520,
      status: 'PAID',
      notes: 'Cleared in full.',
    },
    {
      invoiceNumber: 'INV-2026-0901',
      schoolIndex: 0,
      month: 9,
      year: 2026,
      subtotal: 105000,
      cgst: 9450,
      sgst: 9450,
      igst: 0,
      tds: 0,
      total: 123900,
      status: 'PARTIALLY_PAID',
      notes: 'Advance of Rs. 60,000 received. Balance Rs. 63,900 due.',
    },
    {
      invoiceNumber: 'INV-2026-0902',
      schoolIndex: 2,
      month: 9,
      year: 2026,
      subtotal: 30000,
      cgst: 2700,
      sgst: 2700,
      igst: 0,
      tds: 0,
      total: 35400,
      status: 'SENT',
      notes: 'Invoice sent electronically. Due date 15th October.',
    },
    {
      invoiceNumber: 'INV-2026-0903',
      schoolIndex: 3,
      month: 9,
      year: 2026,
      subtotal: 28000,
      cgst: 2520,
      sgst: 2520,
      igst: 0,
      tds: 0,
      total: 33040,
      status: 'OVERDUE',
      notes: 'Reminder email sent to accounts dept on 20th Oct.',
    },
    {
      invoiceNumber: 'INV-2026-1001',
      schoolIndex: 4,
      month: 10,
      year: 2026,
      subtotal: 40000,
      cgst: 3600,
      sgst: 3600,
      igst: 0,
      tds: 0,
      total: 47200,
      status: 'DRAFT',
      notes: 'Draft for current billing cycle awaiting attendance sign-off.',
    },
  ]

  for (const inv of invoicesData) {
    const lineItems = [
      {
        description: `Professional PTI Staffing Service - ${inv.month}/${inv.year}`,
        quantity: 1,
        rate: inv.subtotal,
        amount: inv.subtotal,
      },
    ]

    await prisma.invoice.create({
      data: {
        invoiceNumber: inv.invoiceNumber,
        schoolId: schools[inv.schoolIndex].id,
        month: inv.month,
        year: inv.year,
        lineItems: JSON.stringify(lineItems),
        subtotal: inv.subtotal,
        cgst: inv.cgst,
        sgst: inv.sgst,
        igst: inv.igst,
        tds: inv.tds,
        total: inv.total,
        status: inv.status,
        dueDate: new Date(inv.year, inv.month, 10),
        notes: inv.notes,
      },
    })
  }
  console.log(`Created ${invoicesData.length} invoices`)

  // 10. Testimonials (5)
  const testimonialsData = [
    {
      schoolName: 'Delhi Public School, Jaipur',
      contactName: 'Dr. Sunita Kothari',
      designation: 'Principal',
      text: 'FitKids Staffing has revolutionized our sports program. Their PTI teachers are punctilious, police-verified, and extremely dedicated. When one teacher took medical leave, a certified replacement arrived within 24 hours!',
      rating: 5,
      photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=128&h=128&fit=crop',
      order: 1,
    },
    {
      schoolName: "St. Xavier's Senior Secondary School, Jodhpur",
      contactName: 'Fr. Thomas Anthony',
      designation: 'Principal & Director',
      text: 'Finding certified B.P.Ed instructors in Western Rajasthan used to take months. With FitKids, we contracted 2 top-tier coaches in less than a week. Our basketball and football teams won district gold medals this season.',
      rating: 5,
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop',
      order: 2,
    },
    {
      schoolName: 'Ryan International School, Udaipur',
      contactName: 'Mrs. Rekha Singhal',
      designation: 'Headmistress',
      text: 'The transparency in billing, comprehensive monthly attendance reports, and zero compliance headache makes FitKids our preferred PE partner. Highly recommended for all CBSE and ICSE schools.',
      rating: 5,
      photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=128&h=128&fit=crop',
      order: 3,
    },
    {
      schoolName: 'Army Public School, Ajmer',
      contactName: 'Col. (Retd.) R. S. Rathore',
      designation: 'School Director',
      text: 'In an Army school, discipline is non-negotiable. The PTIs supplied by FitKids exhibit the highest standards of physical fitness, punctual drill leadership, and child safety compliance.',
      rating: 5,
      photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop',
      order: 4,
    },
    {
      schoolName: 'Neerja Modi School, Jaipur',
      contactName: 'Dr. Indu Dubey',
      designation: 'Vice Principal',
      text: 'Our students love the fitness agility routines and yoga modules implemented by FitKids trainers. The positive impact on student mental wellbeing and focus in classrooms has been remarkable.',
      rating: 5,
      photoUrl: 'https://images.unsplash.com/photo-1580894732488-b22396e95f15?w=128&h=128&fit=crop',
      order: 5,
    },
  ]

  for (const t of testimonialsData) {
    await prisma.testimonial.create({ data: t })
  }
  console.log(`Created ${testimonialsData.length} testimonials`)

  // 11. FAQs (8)
  const faqsData = [
    {
      question: 'What qualifications do your PTI teachers possess?',
      answer: 'All our Physical Training Instructors hold NCTE-recognized degrees and diplomas including D.P.Ed (Diploma in Physical Education), B.P.Ed (Bachelor of Physical Education), or M.P.Ed (Master of Physical Education), along with verified sports specializations and first-aid certifications.',
      category: 'Qualifications',
      order: 1,
    },
    {
      question: 'How do you verify the background and child-safety of instructors?',
      answer: 'Every candidate undergoes a mandatory 5-step background verification process: police character clearance, Aadhaar identity authentication, academic degree validation from UGC/NCTE universities, previous employer background check, and medical fitness screening.',
      category: 'Safety & Verification',
      order: 2,
    },
    {
      question: 'What happens if a PTI teacher falls sick or takes leave?',
      answer: 'FitKids provides a 100% Replacement Guarantee. If an instructor is absent for more than 2 consecutive days or needs emergency leave, we deploy a pre-screened substitute instructor at zero additional charge to ensure zero disruption to school classes.',
      category: 'Operations',
      order: 3,
    },
    {
      question: 'How does the billing and contract model work?',
      answer: 'We operate on a transparent monthly contract model with a fixed per-PTI-per-month service fee. FitKids handles the instructor stipend, PF, ESI, gratuity, and tax compliances. The school receives a single GST invoice every month with clear credit terms.',
      category: 'Billing & Pricing',
      order: 4,
    },
    {
      question: 'Can we conduct interviews and demo classes before deployment?',
      answer: 'Yes, absolutely. We present 2 to 3 pre-vetted candidate profiles for each open requirement. The school leadership and sports department can conduct personal interviews and on-ground practical demo sessions before signing the placement agreement.',
      category: 'Hiring Process',
      order: 5,
    },
    {
      question: 'Do you provide specialized coaching for sports like Football, Cricket, or Skating?',
      answer: 'Yes! Beyond general physical training instructors, we provide NIS-certified and state-level coaches specialized in Athletics, Football, Cricket, Basketball, Volleyball, Badminton, Table Tennis, Yoga, and Martial Arts.',
      category: 'Services',
      order: 6,
    },
    {
      question: 'Can FitKids assist with our Annual Sports Day and March Past training?',
      answer: 'Yes. Our staff are trained in organizing March Past formations, pyramid displays, aerobic drills, torch lighting protocols, track & field events management, and sports day scorekeeping.',
      category: 'Services',
      order: 7,
    },
    {
      question: 'Which cities across Rajasthan do you currently serve?',
      answer: 'We currently deploy PTI staff across Jaipur, Jodhpur, Udaipur, Kota, Ajmer, Bikaner, Alwar, Bhilwara, Sikar, Chittorgarh, and Sri Ganganagar, with rapid expansion into tier-2 & tier-3 educational clusters.',
      category: 'Coverage',
      order: 8,
    },
  ]

  for (const f of faqsData) {
    await prisma.fAQ.create({ data: f })
  }
  console.log(`Created ${faqsData.length} FAQs`)

  // 12. Blog Posts (6)
  const blogPostsData = [
    {
      title: 'Why Every Rajasthan School Needs Certified B.P.Ed Instructors in 2026',
      slug: 'why-every-rajasthan-school-needs-certified-bped-instructors',
      excerpt: 'Modern school education requires more than whistle-blowing. Certified physical instructors develop motor skills, emotional resilience, and lifelong cardiovascular health.',
      category: 'Physical Education',
      coverUrl: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=1200&h=600&fit=crop',
      published: true,
      authorId: superAdmin.id,
      publishedAt: new Date('2026-09-15'),
      content: `Physical education has evolved from an optional extracurricular period into a cornerstone of student development. In Rajasthan, schools adopting holistic physical training curriculums have observed marked improvements in student attendance, classroom attentiveness, and mental wellness.

### The Role of NCTE-Recognized Qualifications
A qualified B.P.Ed (Bachelor of Physical Education) educator understands human biomechanics, exercise physiology, injury prevention, and age-appropriate drills. Untrained staff risk student musculoskeletal injuries and lack pedagogical understanding.

### Alignment with NEP 2020
The National Education Policy (NEP) 2020 mandates sports integration as an experiential learning tool. Qualified PTIs ensure structured fitness assessments, tracking BMI and cardiovascular endurance across all age cohorts.`,
    },
    {
      title: 'How to Organize an Unforgettable Annual Sports Day: A Step-by-Step Guide',
      slug: 'how-to-organize-unforgettable-annual-sports-day-guide',
      excerpt: 'From march-past synchronization to track logistics, here is how school principals can pull off a flawless sports carnival with zero chaos.',
      category: 'School Events',
      coverUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=600&fit=crop',
      published: true,
      authorId: superAdmin.id,
      publishedAt: new Date('2026-09-28'),
      content: `Annual Sports Day is the crowning event in every school's academic calendar. It showcases institutional discipline, student athleticism, and parent community engagement.

### 1. Six Weeks Before: Theme & Drills
Select an inspiring theme. Begin morning march-past synchronization, house contingent band drills, and primary grade mass-PT demonstrations.

### 2. Four Weeks Before: Heats and Selections
Run preliminary track heats (100m, 200m, 400m, 4x100m relay) during games periods to finalize finalists. This minimizes on-day schedule delays.

### 3. Equipment & Field Marking
Ensure certified track line markings with calcium carbonate powder, accurate finish-line camera timers, and adequate first-aid hydration kiosks.`,
    },
    {
      title: 'Child Safety First: Why Police Verification for School PTI Staff is Non-Negotiable',
      slug: 'child-safety-first-police-verification-school-staff',
      excerpt: 'A comprehensive look at POCSO compliance, character background checks, and stringent hiring protocols essential for educational institutions.',
      category: 'Safety & Compliance',
      coverUrl: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=1200&h=600&fit=crop',
      published: true,
      authorId: adminUser.id,
      publishedAt: new Date('2026-10-05'),
      content: `Physical training instructors interact closely with children across all age groups during games, coaching, and sporting excursions. Safeguarding student dignity and safety is the supreme institutional responsibility.

### Mandatory Verification Pillars
1. **Local Police Verification**: Validating no criminal history or pending legal notices across state police registries.
2. **Aadhaar Bio-data Cross-verification**: Eliminating impersonation or fraudulent identity documents.
3. **POCSO Awareness Orientation**: Training instructors in non-touching demonstration techniques and safe communication protocols.`,
    },
    {
      title: 'Combating Childhood Obesity in Urban Rajasthan: The FitKids Action Blueprint',
      slug: 'combating-childhood-obesity-urban-rajasthan',
      excerpt: 'Sedentary screen time and high-caloric snacks are accelerating juvenile lifestyle diseases. Here is how daily 45-minute structured drills reverse the trend.',
      category: 'Health & Wellness',
      coverUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1200&h=600&fit=crop',
      published: true,
      authorId: adminUser.id,
      publishedAt: new Date('2026-10-12'),
      content: `Recent pediatric surveys in Jaipur and Jodhpur indicate that nearly 28% of urban school-going adolescents fall into overweight or pre-diabetic categories. 

### Micro-Interval Agility Drills
Short, high-fun circuit exercises including ladder drills, shuttle runs, and cone relays burn elevated caloric output while boosting teamwork and dopamine release.

### Parent-Teacher Nutrition Synergy
Schools must partner with parents to replace processed tuck-shop fare with nutrient-dense regional grains, sprouts, and hydration options.`,
    },
    {
      title: 'Yoga in Schools: Cultivating Focus, Flexibility, and Calm in Exam Season',
      slug: 'yoga-in-schools-cultivating-focus-flexibility-calm',
      excerpt: 'Practical 15-minute pranayama and asana modules designed to dissolve exam anxiety and elevate academic concentration in high schoolers.',
      category: 'Yoga & Fitness',
      coverUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&h=600&fit=crop',
      published: true,
      authorId: superAdmin.id,
      publishedAt: new Date('2026-10-18'),
      content: `The pressure of board examinations and entrance tests often causes students severe cognitive fatigue and stress posture disorders. 

### Proven Daily Sequences
- **Surya Namaskar**: 5 rounds to warm up muscular chains and restore postural symmetry.
- **Anulom Vilom Pranayama**: 7 minutes of alternate nostril breathing to balance sympathetic and parasympathetic nervous responses.
- **Bhramari Pranayama**: Calming humming frequencies that release mental agitation immediately before tests.`,
    },
    {
      title: 'Building a High-Performance School Sports Team from Scratch',
      slug: 'building-high-performance-school-sports-team',
      excerpt: 'A blueprint for sports directors to scout, train, and motivate students to compete and win at district, state, and CBSE cluster levels.',
      category: 'Sports Coaching',
      coverUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=600&fit=crop',
      published: true,
      authorId: accountsUser.id,
      publishedAt: new Date('2026-10-21'),
      content: `Winning trophies requires systematic talent scouting rather than sporadic pre-tournament practice sessions.

### Key Tenets
1. **Year-round Conditioning**: Maintaining baseline cardiovascular and core strength through off-season routines.
2. **Video Analysis**: Reviewing game footage to refine tactical field positions.
3. **Sports Psychology**: Teaching young athletes mental resilience in high-pressure penalty shootouts and match tie-breaks.`,
    },
  ]

  for (const b of blogPostsData) {
    await prisma.blogPost.create({ data: b })
  }
  console.log(`Created ${blogPostsData.length} blog posts`)

  // 13. Gallery Items (6)
  const galleryItemsData = [
    {
      url: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&h=600&fit=crop',
      type: 'IMAGE',
      title: 'Inter-School Athletics Championship Jaipur',
      category: 'Events',
      order: 1,
    },
    {
      url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop',
      type: 'IMAGE',
      title: 'Under-17 State Football Training Camp',
      category: 'Sports',
      order: 2,
    },
    {
      url: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&h=600&fit=crop',
      type: 'IMAGE',
      title: 'International Yoga Day Morning Session',
      category: 'Training',
      order: 3,
    },
    {
      url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop',
      type: 'IMAGE',
      title: 'Annual Sports Day March-Past Review',
      category: 'Schools',
      order: 4,
    },
    {
      url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop',
      type: 'IMAGE',
      title: 'Basketball Tactical Drills & Shootout',
      category: 'Sports',
      order: 5,
    },
    {
      url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop',
      type: 'IMAGE',
      title: 'Physical Instructor Orientation & Screening',
      category: 'Training',
      order: 6,
    },
  ]

  for (const g of galleryItemsData) {
    await prisma.galleryItem.create({ data: g })
  }
  console.log(`Created ${galleryItemsData.length} gallery items`)

  // 14. School Logos (5)
  const schoolLogosData = [
    { schoolName: 'Delhi Public School', logoUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=200&h=100&fit=crop', order: 1 },
    { schoolName: "St. Xavier's School", logoUrl: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=200&h=100&fit=crop', order: 2 },
    { schoolName: 'Ryan International', logoUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=200&h=100&fit=crop', order: 3 },
    { schoolName: 'Army Public School', logoUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=200&h=100&fit=crop', order: 4 },
    { schoolName: 'Neerja Modi School', logoUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=100&fit=crop', order: 5 },
  ]

  for (const sl of schoolLogosData) {
    await prisma.schoolLogo.create({ data: sl })
  }
  console.log(`Created ${schoolLogosData.length} school logos`)

  // 15. Site Settings
  const siteSettingsData = [
    { key: 'company_name', value: 'FitKids Staffing' },
    { key: 'tagline', value: 'Qualified PTI Teachers for Your School' },
    { key: 'office_address', value: '42, Vaishali Nagar, Jaipur, Rajasthan 302021' },
    { key: 'contact_phone', value: '+91 98765 43210' },
    { key: 'contact_email', value: 'info@fitkidsstaffing.in' },
    { key: 'whatsapp_number', value: '+919876543210' },
    { key: 'gst_number', value: '08AAACF1234A1Z5' },
    { key: 'udyam_number', value: 'UDYAM-RJ-14-0098234' },
    { key: 'stat_schools_served', value: '500+' },
    { key: 'stat_ptis_placed', value: '1200+' },
    { key: 'stat_students_impacted', value: '2M+' },
    { key: 'stat_cities_covered', value: '15' },
  ]

  for (const st of siteSettingsData) {
    await prisma.siteSetting.create({ data: st })
  }
  console.log(`Created ${siteSettingsData.length} site settings`)

  // 16. Documents & Agreements
  await prisma.document.create({
    data: {
      entityType: 'PTI',
      entityId: ptis[0].id,
      ptiId: ptis[0].id,
      type: 'police_verification',
      name: 'Police Clearance Certificate - Rahul Sharma',
      url: '/uploads/docs/police_rahul.pdf',
      verified: true,
      notes: 'Cleared by Jaipur Police Commissionerate',
    },
  })

  await prisma.document.create({
    data: {
      entityType: 'PTI',
      entityId: ptis[0].id,
      ptiId: ptis[0].id,
      type: 'degree',
      name: 'B.P.Ed Degree Certificate - University of Rajasthan',
      url: '/uploads/docs/bped_rahul.pdf',
      verified: true,
      notes: 'Authenticated from university registrar database',
    },
  })

  await prisma.agreement.create({
    data: {
      entityType: 'SCHOOL',
      entityId: schools[0].id,
      schoolId: schools[0].id,
      templateType: 'service_agreement',
      generatedPdfUrl: '/uploads/agreements/DPS_Jaipur_Service_Agreement_2024.pdf',
      signedPdfUrl: '/uploads/agreements/DPS_Jaipur_Service_Agreement_Signed.pdf',
      signedAt: new Date('2024-03-25'),
      expiresAt: new Date('2025-03-31'),
      notes: 'Standard 12-month staffing agreement with 30-day replacement clause',
    },
  })

  // 17. Activity Logs
  await prisma.activityLog.create({
    data: {
      userId: superAdmin.id,
      action: 'SYSTEM_SEED',
      entity: 'DATABASE',
      entityId: 'ALL',
      before: '{}',
      after: JSON.stringify({ status: 'Database seeded with production sample data' }),
      ip: '127.0.0.1',
    },
  })

  // 18. Notifications
  await prisma.notification.create({
    data: {
      userId: superAdmin.id,
      type: 'ENQUIRY',
      title: 'New School Lead Received',
      message: 'Birla Public School Pilani requested 4 PTI coaches.',
      read: false,
      link: '/admin/enquiries',
    },
  })

  await prisma.notification.create({
    data: {
      userId: superAdmin.id,
      type: 'APPLICATION',
      title: 'New PTI Application',
      message: 'Harish Chandra Gurjar applied with B.P.Ed qualification.',
      read: false,
      link: '/admin/applications',
    },
  })

  console.log('Seed finished successfully!')
}

main()
  .catch((e) => {
    console.error('Error running seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
