import React, { useEffect, useState } from 'react';

const RenderOptions = () => {
    const [stateData, setStateData] = useState({})
    const professionsOptions = [
        { value: '', label: 'Select Profession Type' },
        { value: 'accountant', label: 'Accountant' },
        { value: 'actor', label: 'Actor' },
        { value: 'architect', label: 'Architect' },
        { value: 'artist', label: 'Artist' },
        { value: 'chef', label: 'Chef' },
        { value: 'doctor', label: 'Doctor' },
        { value: 'engineer', label: 'Engineer' },
        { value: 'farmer', label: 'Farmer' },
        { value: 'lawyer', label: 'Lawyer' },
        { value: 'mechanic', label: 'Mechanic' },
        { value: 'musician', label: 'Musician' },
        { value: 'nurse', label: 'Nurse' },
        { value: 'pilot', label: 'Pilot' },
        { value: 'teacher', label: 'Teacher' },
        { value: 'writer', label: 'Writer' },
        { value: 'actor', label: 'Actor' },
        { value: 'athlete', label: 'Athlete' },
        { value: 'baker', label: 'Baker' },
        { value: 'barber', label: 'Barber' },
        { value: 'blogger', label: 'Blogger' },
        { value: 'carpenter', label: 'Carpenter' },
        { value: 'chef', label: 'Chef' },
        { value: 'coach', label: 'Coach' },
        { value: 'dentist', label: 'Dentist' },
        { value: 'designer', label: 'Designer' },
        { value: 'electrician', label: 'Electrician' },
        { value: 'entrepreneur', label: 'Entrepreneur' },
        { value: 'firefighter', label: 'Firefighter' },
        { value: 'fitness instructor', label: 'Fitness Instructor' },
        { value: 'florist', label: 'Florist' },
        { value: 'graphic designer', label: 'Graphic Designer' },
        { value: 'hairdresser', label: 'Hairdresser' },
        { value: 'journalist', label: 'Journalist' },
        { value: 'librarian', label: 'Librarian' },
        { value: 'manager', label: 'Manager' },
        { value: 'mechanic', label: 'Mechanic' },
        { value: 'model', label: 'Model' },
        { value: 'musician', label: 'Musician' },
        { value: 'nurse', label: 'Nurse' },
        { value: 'painter', label: 'Painter' },
        { value: 'photographer', label: 'Photographer' },
        { value: 'plumber', label: 'Plumber' },
        { value: 'police officer', label: 'Police Officer' },
        { value: 'professor', label: 'Professor' },
        { value: 'programmer', label: 'Programmer' },
        { value: 'real estate agent', label: 'Real Estate Agent' },
        { value: 'researcher', label: 'Researcher' },
        { value: 'salesperson', label: 'Salesperson' },
        { value: 'scientist', label: 'Scientist' },
        { value: 'singer', label: 'Singer' },
        { value: 'teacher', label: 'Teacher' },
        { value: 'translator', label: 'Translator' },
        { value: 'veterinarian', label: 'Veterinarian' },
        { value: 'waiter/waitress', label: 'Waiter/Waitress' },
        { value: 'student', label: 'Student' },
        { value: 'others', label: 'Others' },
    ];
    useEffect(() => {
        setStateData(require('../../data/kerala.json'))
    }, []);
    let districtOptions = [{ value: "", label: "Select District" }]
    stateData?.districts && stateData?.districts.map((item) => {
        districtOptions.push({
            value: item?.district,
            label: item?.district
        })
    })

    const financialStatus = [
        { value: "ritch", label: "Ritch" },
        { value: "upper", label: "Upper Middle Class" },
        { value: "middle", label: "Middle Class" },
        { value: "lower", label: "Lower Middle Class" },
        { value: "poor", label: "Poor" },
    ]

    const ageOptions = [];

    for (let age = 18; age <= 70; age++) {
        ageOptions.push(age);
    }

    const heightOptions = [];

    for (let age = 120; age <= 200; age++) {
        heightOptions.push(age);
    }

    const weightOptions = [];

    for (let w = 30; w <= 150; w++) {
        weightOptions.push(w);
    }

    const bloodGroupOptions = [
        { value: 'A+', label: 'A+' },
        { value: 'A-', label: 'A-' },
        { value: 'B+', label: 'B+' },
        { value: 'B-', label: 'B-' },
        { value: 'O+', label: 'O+' },
        { value: 'O-', label: 'O-' },
        { value: 'AB+', label: 'AB+' },
        { value: 'AB-', label: 'AB-' },
    ];

    const maritalStatusOptions = [
        { value: 'Single', label: 'Single' },
        { value: 'Married', label: 'Married' },
        { value: 'Divorced', label: 'Divorced' },
        { value: 'Widowed', label: 'Widowed' },
    ];

    const physicalStatusOptions = [
        { value: 'normal_person', label: 'Normal Person' },
        { value: 'deaf_or_dumb', label: 'Deaf/Dumb' },
        { value: 'blind', label: 'Blind' },
        { value: 'physically_challenged', label: 'Physically Challenged' },
        { value: 'mentally_challenged', label: 'Mentally Challenged' },
        { value: 'other_disablity', label: 'Other Disability' },
    ];

    const communityOptions = [
        { value: 'A Muslim', label: 'A Muslim' },
        { value: 'Ahle Hadees', label: 'Ahle Hadees' },
        { value: 'Bohra', label: 'Bohra' },
        { value: 'Hanabali', label: 'Hanabali' },
        { value: 'Hanafi', label: 'Hanafi' },
        { value: 'Jamat Islami', label: 'Jamat Islami' },
        { value: 'Maliki', label: 'Maliki' },
        { value: 'Salafi', label: 'Salafi' },
        { value: 'Salafi(KNM)', label: 'Salafi(KNM)' },
        { value: 'Salafi(Markaz Dawa)', label: 'Salafi(Markaz Dawa)' },
        { value: 'Salafi(Wisdom)', label: 'Salafi(Wisdom)' },
        { value: 'Sayyid', label: 'Sayyid' },
        { value: 'Shia', label: 'Shia' },
        { value: 'Sufism', label: 'Sufism' },
        { value: 'Sunni', label: 'Sunni' },
        { value: 'Sunni(AP)', label: 'Sunni(AP)' },
        { value: 'Sunni(EK)', label: 'Sunni(EK)' },
        { value: 'Thableegh Jamaat', label: 'Thableegh Jamaat' },
        { value: 'Urdu Muslim', label: 'Urdu Muslim' },
        { value: 'Pathan', label: 'Pathan' },
        { value: 'Other', label: 'Other' },
    ];

    const educationOptions = [
        { value: 'sslc', label: 'SSLC' },
        { value: 'pls_two', label: 'Plus Two' },
        { value: 'degree', label: 'Bachelor Degree' },
        { value: 'pg', label: 'Master Degree' },
    ];

    const complexionOptions = [
        { value: 'very_fair', label: 'Very Fair' },
        { value: 'fair', label: 'Fair' },
        { value: 'wheatish', label: 'Wheatish' },
        { value: 'dark', label: 'Dark' },
    ];






    return {
        professionsOptions,
        stateData,
        districtOptions,
        financialStatus,
        ageOptions,
        heightOptions,
        weightOptions,
        bloodGroupOptions,
        maritalStatusOptions,
        physicalStatusOptions,
        communityOptions,
        educationOptions,
        complexionOptions
    };
};

export default RenderOptions;
