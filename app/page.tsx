"use client"
import { Eye, RotateCcw, Save } from "lucide-react";
import Image from "next/image";
import PersonalDetailsForm from "./components/PersonalDetailsForm";
import {useRef, useState } from "react";
import { Education, Experience, Hobby, Language, PersonalDetails, Skill } from "@/type";
import { educationsPreset, experiencesPreset, hobbiesPreset, languagesPreset, personalDetailsPreset, skillsPreset } from "@/presets";
import CVPreview from "./components/CVPreview";
import ExperienceForm from "./components/ExperienceForm";
import EducationForm from "./components/EducationForm";
import LanguageForm from "./components/LanguageForm";
import SkillForm from "./components/SkillForm";
import HobbyForm from "./components/HobbyForm";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";


export default function Home() {
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>(personalDetailsPreset)
  const [file, setFile] = useState<File | null>(null)
  const [theme, setTheme] = useState<string>('cupcake')
  const [experiences, setExperience] = useState<Experience[]>(experiencesPreset)
  const [educations, setEducations] = useState<Education[]>(educationsPreset)
  const [languages, setLanguages] = useState<Language[]>(languagesPreset)
  const [skills, setSkills] = useState<Skill[]>(skillsPreset)
  const [hobbies, setHobbies] = useState<Hobby[]>(hobbiesPreset)
  const previewModalRef = useRef(null)
  
  const handleDownloadPdf = async () => {
    const element = previewModalRef.current
    if(element){
      try{
        const canvas = await html2canvas(element, {
          scale: 3,
          useCORS: true,
        })
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF(
          {
            orientation: 'portrait',
            unit: 'mm',
            format: 'A4'
          }
        )

       /*  const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width */

        pdf.addImage(imgData, 'PNG', 0, 0, 211, 298);
        pdf.save(`CV.pdf`)

      } catch(error){
        console.error('Erreur lors de la génération du PDF :', error);
      }
    }
  }


  const themes = [
    "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter", "dim", "nord", "sunset"
  ]
  const handleResetPersonalDetails = () => setPersonalDetails(
    {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      photoUrl: '',
      postSeeking: '',
      description: '',
    }
  )

  const [isCardOpen, setIsCardOpen] = useState(false);
  const handleResetExperiences = () => setExperience([])
  const handleResetEducations = () => setEducations([])
  const handleResetLanguages = () => setLanguages([])
  const handleResetSkills = () => setSkills([])
  const handleResetHobbies = () => setHobbies([])

  const [zoom, setZoom] = useState<number>(163)
  return (
    <div>
      <div className="hidden lg:block">
        <section className="flex items-center h-screen">
          <div className="w-1/3 h-full p-10 bg-base-200 scrollable no-scrollbar">
            <div className="mb-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold italic">
                CV<span className="text-primary">Builder</span>
              </h1>
              <button className="btn btn-primary" onClick={() => setIsCardOpen(true)}> Prévisualiser
              <Eye className="w-4" /></button>
            </div>
            <div className="flex flex-col gap-6 rounded-lg">
              <div className="flex justify-between items-center">
                <h1 className="badge badge-primary badge-outline"> Qui êtes-vous</h1>
                <button onClick={handleResetPersonalDetails} className="btn btn-primary btn-small">
                  <RotateCcw />
                </button>
              </div>
            </div>
            <PersonalDetailsForm
              personalDetails={personalDetails}
              setPersonalDetails={setPersonalDetails}
              setFile={setFile}
            />

            <div className="flex justify-between items-center">
              <h1 className="badge badge-primary badge-outline">Expériences</h1>
              <button
                onClick={handleResetExperiences}
                className="btn btn-primary btn-sm">
                <RotateCcw />
              </button>
            </div>
            <ExperienceForm
              experience={experiences}
              setExperiences={setExperience}
            />

            <div className="flex justify-between items-center">
              <h1 className="badge badge-primary badge-outline">Educations</h1>
              <button
                onClick={handleResetEducations}
                className="btn btn-primary btn-sm">
                <RotateCcw />
              </button>
            </div>

            <EducationForm
              educations={educations}
              setEducations={setEducations}
            />

            <div className="flex justify-between items-center">
              <h1 className="badge badge-primary badge-outline">Langues</h1>
              <button
                onClick={handleResetLanguages}
                className="btn btn-primary btn-sm">
                <RotateCcw />
              </button>
            </div>

            <LanguageForm
              languages={languages}
              setLanguages={setLanguages}
            />

            <div className="flex justify-between">

              <div className="w-1/2">
                <div className="flex justify-between items-center">
                  <h1 className="badge badge-primary badge-outline">Compétences</h1>
                  <button
                    onClick={handleResetSkills}
                    className="btn btn-primary btn-sm">
                    <RotateCcw className="w-4" />
                  </button>
                </div>
                <SkillForm skills={skills} setSkills={setSkills} />
              </div>

              <div className="w-1/2 ml-4">
                <div className="flex justify-between items-center">
                  <h1 className="badge badge-primary badge-outline">Loisirs</h1>
                  <button
                    onClick={handleResetHobbies}
                    className="btn btn-primary btn-sm">
                    <RotateCcw className="w-4" />
                  </button>
                </div>
                <HobbyForm hobbies={hobbies} setHobbies={setHobbies} />
              </div>
            </div>
          </div>

          <div className="w-2/3 h-full bg-base-100 bg-[url('/file.svg')] bg-cover bg-center scrollable-preview relative">
            <div className="flex items-center justify-center fixed z-[9999] top-5 right-5">
              <input type="range" min={50} max={200} value={zoom} className="range range-xs range-primary"
                onChange={(e) => setZoom(Number(e.target.value))}
              />
              <p className="ml-4 text-sm text-primary">{zoom}%</p>
            </div>
            <select value={theme}
              className="select select-bordered fixed z-[9999] select-sm top-12 right-5 w-40"
              onChange={(e) => setTheme(e.target.value)}
            >
              {themes.map((themeName) => (
                <option key={themeName} value={themeName}>{themeName}</option>
              ))}
            </select>

            <div className="flex justify-center items-center"
              style={{
                transform: `scale(${zoom / 200})`,
              }}
            >
              <CVPreview
                theme={theme}
                personalDetails={personalDetails}
                file={file}
                experiences={experiences}
                educations={educations}
                languages={languages}
                skills={skills}
                hobbies={hobbies}
                download={false}
              />
            </div>
          </div>
        </section>

        {isCardOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 p-4" onClick={() => setIsCardOpen(false)}>
            <div 
              className="card bg-base-100 shadow-xl rounded-lg overflow-hidden relative mx-auto px-4 w-[90vw] md:w-[70vw] lg:w-[90vw] h-[100vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Bouton de fermeture en haut à droite */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4" onClick={() => setIsCardOpen(false)}>✕</button>

              {/* Titre */}
              <div className="card-body">
                <h2 className="card-title text-xl font-bold text-center">Aperçu du CV</h2>
              </div>

              {/* Contenu avec un défilement si nécessaire */}
              <div className="overflow-auto h-full px-4">
                <div className="flex justify-end mb-5">
                  <button className="btn btn-primary" onClick={handleDownloadPdf}>
                    Télécharger
                    <Save className="w-4" />
                  </button>
                </div>
                <div className="w-full max-x-full overflow">
                  <div className="w-full max-w-full flex justify-center items-center" ref={previewModalRef}>
                    <CVPreview
                      theme={theme}
                      personalDetails={personalDetails}
                      file={file}
                      experiences={experiences}
                      educations={educations}
                      languages={languages}
                      skills={skills}
                      hobbies={hobbies}
                      download={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="lg:hidden">
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-3xl font-bold">Désolé, le CV builder est uniquement accessible sur ordinateur</h1>
              <Image
                src="/wrong-sad.gif"
                width={500}
                height={500}
                alt="Picture of the author"
                className="mx-auto my-6"
              />
              <p className="py-6">
              Toi aussi comment tu vas vouloir créer ton CV sur portable. Soit plus responsable
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
