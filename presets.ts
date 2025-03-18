import { Education, Experience, Hobby, Language, PersonalDetails, Skill } from '@/type';

export const personalDetailsPreset: PersonalDetails = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    photoUrl: '/profile.jpg',
    postSeeking:'',
    description:``
};

export const experiencesPreset: Experience[] = [
    {
        id: 'uuid-1',
        jobTitle: '',
        companyName: '',
        startDate: '',
        endDate: '',
        description: ''
    },
    {
        id: 'uuid-2',
        jobTitle: '',
        companyName: '',
        startDate: '',
        endDate: '',
        description: ''
    }
];

export const educationsPreset: Education[] = [
    {
        id: 'uuid-3',
        degree: '',
        school: '',
        startDate: '',
        endDate: '',
        description: ''
    }
];

export const skillsPreset: Skill[] = [
    { id: 'uuid-4', name: '' },
    { id: 'uuid-5', name: '' }
];

export const languagesPreset: Language[] = [
    { id: 'uuid-6', language: '', proficiency: '' },
    { id: 'uuid-7', language: '', proficiency: '' }
];

export const hobbiesPreset: Hobby[] = [
    { id: 'uuid-8', name: '' },
    { id: 'uuid-9', name: '' }
];
