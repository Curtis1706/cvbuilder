import { Education } from '@/type';
import { Plus } from 'lucide-react';
import React, { useState } from 'react'

type Props = {
    educations: Education[];
    setEducations: (educations: Education[]) => void
}

const EducationForm: React.FC<Props> = ({ educations, setEducations }) => {
    const [newEducation, setNewEducation] = useState<Education>(
        {
            school: '',
            degree: '',
            startDate: '',
            endDate: '',
            description: '',
        }
    )
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Education) => {
        setNewEducation({ ...newEducation, [field]: e.target.value })
      }
      const handleAddEducation = () =>{
        setEducations([...educations, newEducation])
        setNewEducation(
          {
            school: '',
            degree: '',
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
          placeholder="Nom de l'école"
          value={newEducation.school}
          className='input input-bordered w-full'
          onChange={(e) => handleChange(e, 'school')}
        />
        <input type="text"
          placeholder="Diplôme"
          value={newEducation.degree}
          className='input input-bordered w-full ml-4'
          onChange={(e) => handleChange(e, 'degree')}
        />
      </div>
      <div className='flex justify-between'>
        <input type="text"
          placeholder='Date de Début'
          onFocus={(e) => e.target.type = "date"}
          onBlur={(e) => {
            if (!e.target.value) e.target.type = "text"
          }}
          value={newEducation.school}
          className='input input-bordered w-full'
          onChange={(e) => handleChange(e, 'startDate')}
        />
        <input type="text"
          placeholder='Date de Fin'
          onFocus={(e) => e.target.type = "date"}
          onBlur={(e) => {
            if (!e.target.value) e.target.type = "text"
          }}
          value={newEducation.school}
          className='input input-bordered w-full ml-4'
          onChange={(e) => handleChange(e, 'endDate')}
        />

      </div>
      <textarea
        placeholder='Description'
        value={newEducation.description}
        className='input input-bordered w-full h-40 '
        onChange={(e) => handleChange(e, 'description')}>
      </textarea>
    </div>
    <button
    onClick={handleAddEducation}
    className='btn btn-primary mt-4'>
      Ajouter
      <Plus className='w-4' />
    </button>
   </div>
    )
}

export default EducationForm
