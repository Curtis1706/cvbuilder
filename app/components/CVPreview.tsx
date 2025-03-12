import { Education, Experience, Hobby, Language, PersonalDetails, Skill } from '@/type'
import React from 'react'
import Image from 'next/image'
import { BriefcaseBusiness, GraduationCap, Languages, Mail, MapPinCheck, Phone, Star } from 'lucide-react';

type BrowserFile = globalThis.File;

type Props = {
    personalDetails: PersonalDetails;
    file: BrowserFile | null;
    theme: string;
    experiences: Experience[];
    educations: Education[];
    languages: Language[];
    skills: Skill[];
    hobbies: Hobby[];
    download?:boolean;
}
function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
}
const getStarRating = (proficiency: string) => {
    const maxStars = 5;
    let filledStars = 0;

    switch (proficiency) {
        case 'Débutant':
            filledStars = 1;
            break;
        case 'Intermédiaire':
            filledStars = 3;
            break;
        case 'Avancé':
            filledStars = 5;
            break;
        default:
            filledStars = 0;
    }
    return (
        <>
            {Array.from({ length: filledStars }, (_, index) => (
                <Star key={index} className={'text-primary'} />
            ))}
            {Array.from({ length: maxStars - filledStars }, (_, index) => (
                <Star key={index + filledStars} className={'text-gray-300'} />
            ))}
        </>

    );


}


const CVPreview: React.FC<Props> = ({ personalDetails, file, theme, experiences, educations, languages, skills, hobbies, download }) => {
    return (
        <div className={`flex p-16 w-[950px] h-[1200px] shadow-lg ${download ? 'mb-10' : ''}`} data-theme={theme}>

            <div className='flex flex-col w-1/3'>

                <div className='h-80 rounded-full border-8 overflow-hidden border-primary'>
                    {file instanceof File && (
                        <Image
                            src={URL.createObjectURL(file)}
                            width={300}
                            height={300}
                            className='w-full h-full rounded-lg object-cover'
                            alt='picture'
                            onLoadingComplete={() => URL.revokeObjectURL(URL.createObjectURL(file))}
                        />
                    )}
                </div>


                <div className='mt-4 flex-col w-full'>
                    <div>
                        <h1 className='uppercase font-bold my-2'>Contact</h1>
                        <ul className='space-y-2'>

                            {personalDetails.email && (
                                <li className='flex'>
                                    <div className='break-all text-sm relative'>
                                        <div className='ml-8'>{personalDetails.email}</div>
                                        <div className='absolute left-0 top-0'>
                                            <Mail className='w-5 text-primary' />
                                        </div>
                                    </div>
                                </li>
                            )}


                            {personalDetails.phone && (
                                <li className='flex'>
                                    <div className='break-all text-sm relative'>
                                        <div className='ml-8'>{personalDetails.phone}</div>
                                        <div className='absolute left-0 top-0'>
                                            <Phone className='w-5 text-primary' />
                                        </div>
                                    </div>
                                </li>
                            )}


                            {personalDetails.address && (
                                <li className='flex'>
                                    <div className='break-all text-sm relative'>
                                        <div className='ml-8'>{personalDetails.address}</div>
                                        <div className='absolute left-0 top-0'>
                                            <MapPinCheck className='w-5 text-primary' />
                                        </div>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>

                    <div className='mt-6'>
                        <h1 className='uppercase font-bold my-2'>
                            Compétences
                        </h1>
                        <div className='flex flex-wrap gap-2'>
                            {
                                skills.map((skill, index) => (
                                    <p key={index} className='badge badge-primary uppercase'>
                                        {skill.name}
                                    </p>
                                ))
                            }
                        </div>
                    </div>

                    <div className='mt-6'>
                        <h1 className='uppercase font-bold my-2'>
                            Langues
                        </h1>
                        <div className='flex flex-col space-y-2'>
                            {
                                languages.map((lang, index) => (
                                    <div key={index}>
                                        <span
                                            className='capitalize font-semibold'
                                        >
                                            {lang.language}
                                        </span>
                                        <div className='flex mt-2'>
                                            {getStarRating(lang.proficiency)}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className='mt-6'>
                        <h1 className='uppercase font-bold my-2'>
                           Loisirs
                        </h1>
                        <div className='flex flex-col space-y-2'>
                            {
                                hobbies.map((hobby, index) => (
                                    <div key={index}>
                                       <span className='capitalize'>
                                        {hobby.name}
                                       </span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>


                </div>
            </div>


            <div className='w-2/3 ml-8'>
                <div className='w-full flex flex-col space-y-'>
                    <h1 className='uppercase text-xl'>{personalDetails.fullName}</h1>
                    <h2 className='uppercase text-5xl text-primary font-bold'>
                        {personalDetails.postSeeking}
                    </h2>
                    <p className="break-all w-full text-small min-h-[200px]">
                        {personalDetails.description}
                    </p>

                </div>
                <section className='w-full h-fit p-5'>
                    <div>
                        <h1
                            className='uppercase mb-2 font-bold'>
                            Expériences</h1>
                        <ul className='steps steps-vertical space-y-3'>
                            {experiences.map((exp, index) => (
                                <li className='step step-primary' key={index}>
                                    <div className='text-left'>
                                        <h2 className='flex text-md uppercase font-bold'>
                                            <BriefcaseBusiness className='w-5' />
                                            <span className='ml-2'>{exp.jobTitle}</span>
                                        </h2>
                                        <div className='text-sm my-2'>
                                            <span className='badge badge-primary'>{exp.companyName}</span>
                                            <span className='italic ml-2'>
                                                {formatDate(exp.startDate)} au {formatDate(exp.endDate)}
                                            </span>
                                        </div>
                                        <p className='text-sm'>
                                            {exp.description}
                                        </p>
                                    </div>
                                </li>
                            ))
                            }
                        </ul>
                    </div>
                    <div className='mt-6'>
                        <h1
                            className='uppercase mb-2 font-bold'>
                            Educations</h1>
                        <ul className='steps steps-vertical space-y-3'>
                            {educations.map((edu, index) => (
                                <li className='step step-primary' key={index}>
                                    <div className='text-left'>
                                        <h2 className='flex text-md uppercase font-bold'>
                                            <GraduationCap className='w-5' />
                                            <span className='ml-2'>{edu.degree}</span>
                                        </h2>
                                        <div className='text-sm my-2'>
                                            <span className='badge badge-primary'>{edu.school}</span>
                                            <span className='italic ml-2'>
                                                {formatDate(edu.startDate)} au {formatDate(edu.endDate)}
                                            </span>
                                        </div>
                                        <p className='text-sm'>
                                            {edu.description}
                                        </p>
                                    </div>
                                </li>
                            ))
                            }
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default CVPreview;
