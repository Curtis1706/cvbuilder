import { Experience } from '@/type';
import { Plus } from 'lucide-react';
import React, { useState } from 'react'

type Props = {
  experience: Experience[];
  setExperiences: (experience: Experience[]) => void
}
const ExperienceForm: React.FC<Props> = ({ experience, setExperiences }) => {
  const [newExperience, setNewExperience] = useState<Experience>({
    jobTitle: '',
    companyName: '',
    startDate: '',
    endDate: '',
    description: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Experience) => {
    setNewExperience({ ...newExperience, [field]: e.target.value })
  }
  const handleAddExperience = () =>{
    setExperiences([...experience, newExperience])
    setNewExperience(
      {
        jobTitle: '',
        companyName: '',
        startDate: '',
        endDate: '',
        description: '', 
      }
    )
  }

  return (
   <div>
     <div className='flex flex-col gap-4'>
      <div className='flex justify-between'>
        <input type="text"
          placeholder='Nom complet'
          value={newExperience.jobTitle}
          className='input input-bordered w-full'
          onChange={(e) => handleChange(e, 'jobTitle')}
        />
        <input type="text"
          placeholder="Nom de l'entreprise"
          value={newExperience.companyName}
          className='input input-bordered w-full ml-4'
          onChange={(e) => handleChange(e, 'companyName')}
        />
      </div>
      <div className='flex justify-between'>
        <input type="text"
          placeholder='Date de Début'
          onFocus={(e) => e.target.type = "date"}
          onBlur={(e) => {
            if (!e.target.value) e.target.type = "text"
          }}
          value={newExperience.jobTitle}
          className='input input-bordered w-full'
          onChange={(e) => handleChange(e, 'startDate')}
        />
        <input type="text"
          placeholder='Date de Fin'
          onFocus={(e) => e.target.type = "date"}
          onBlur={(e) => {
            if (!e.target.value) e.target.type = "text"
          }}
          value={newExperience.jobTitle}
          className='input input-bordered w-full ml-4'
          onChange={(e) => handleChange(e, 'endDate')}
        />

      </div>
      <textarea
        placeholder='Description'
        value={newExperience.description}
        className='input input-bordered w-full h-40 '
        onChange={(e) => handleChange(e, 'description')}>
      </textarea>
    </div>
    <button
    onClick={handleAddExperience}
    className='btn btn-primary mt-4'>
      Ajouter
      <Plus className='w-4' />
    </button>
   </div>
  )
}

export default ExperienceForm
