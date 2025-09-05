import React from 'react'
import { NavLink } from 'react-router'

type ButtonSectionProfileProps = {
    // El estado actual (ej: 'publicaciones', 'amigos')
    activeSection: string;
    // La función para actualizar el estado
    setActiveSection: (section: string) => void;
    // El nombre de la sección que este botón representa
    sectionName: string;

}

export default function ButtonSectionProfile({ activeSection, setActiveSection, sectionName}: ButtonSectionProfileProps) {

    return (
        <button onClick={() => setActiveSection(sectionName)} className={activeSection === sectionName ? "px-4 py-4 text-[#1877f2] border-b-2 border-[#1877f2] font-semibold" : "px-4 py-4 text-gray-600 hover:bg-gray-100 font-semibold"}>
            {sectionName}
        </button>
    )
}
