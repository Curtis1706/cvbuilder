import React from 'react'
import { PersonalDetails } from '@/type';

type Props = {
    personalDetails: PersonalDetails;
    setPersonalDetails: (pd: PersonalDetails) => void;
    setFile: (file: File | null) => void;
}
const PersonalDetailsForm: React.FC<Props> = ({ personalDetails, setPersonalDetails, setFile }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof PersonalDetails) => {
        setPersonalDetails({ ...personalDetails, [field]: e.target.value })
    }
    const handleFileChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if(selectedFile){
            setFile(selectedFile)
        }
    }
    return (
        <div className='flex flex-col gap-4'>
            <input type="text" placeholder='Nom complet' value={personalDetails.fullName} className='input input-bordered w-full'
                onChange={(e) => handleChange(e, 'fullName')}
            />
            <div className='flex'>
            <input type="email"
             placeholder='Email' 
             value={personalDetails.email} 
             className='input input-bordered w-full'
            onChange={(e) => handleChange(e, 'email')}
            />
            <input type="phone"
             placeholder='Numéro de téléphone' 
             value={personalDetails.phone} 
             className='input input-bordered w-full ml-4'
            onChange={(e) => handleChange(e, 'phone')}
            />
            </div>
            <input type="text"
             placeholder='Adresse' 
             value={personalDetails.address} 
             className='input input-bordered w-full '
            onChange={(e) => handleChange(e, 'address')}
            />
             <input type="file"
             accept='image/'
             className='file-input file-input-bordered w-full file-input-primary '
             onChange={handleFileChange}
            />
            <input type="text"
             placeholder='Emploi' 
             value={personalDetails.postSeeking} 
             className='input input-bordered w-full '
            onChange={(e) => handleChange(e, 'postSeeking')}
            />
            <textarea
            placeholder='Description de la personne' 
             value={personalDetails.description} 
             className='input input-bordered w-full h-40 '
            onChange={(e) => handleChange(e, 'description')}>
            </textarea>

        </div>
    )
}

export default PersonalDetailsForm
