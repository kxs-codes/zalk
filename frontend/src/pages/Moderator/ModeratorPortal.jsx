import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PaintBrushIcon, UserPlusIcon, DocumentTextIcon, DocumentDuplicateIcon } from "@heroicons/react/24/solid";

import ModeratorCreateAccount from './ModeratorCreateAccount';
import ModeratorCreateClassroom from './ModeratorCreateClassroom';
import ModeratorLogs from './ModeratorLogs';

const ModeratorPortal = () => {
    const cardItems = [
        {name: 'Design Classroom', icon: <PaintBrushIcon className="size-8 mb-2"/>}, 
        {name: 'Create Account', icon: <UserPlusIcon className="size-8 mb-2"/>}, 
        {name: 'Access Reports', icon: <DocumentTextIcon className="size-8 mb-2"/>}, 
        {name: 'Access Logs', icon: <DocumentDuplicateIcon className="size-8 mb-2"/>}
    ];

    const navigate = useNavigate();

    const handleClick = (route) => {
        navigate(route);
    }

    return (
        <div className="flex items-center justify-center bg-grey-secondary-lighter-1 w-full h-screen">
            <div className="flex flex-col items-center mt-20 h-4/5 w-9/10 shadow-lg bg-white overflow-y-auto rounded-lg">
                <h2 className="text-2xl font-semibold">Moderator Portal</h2>
                {/* Divs for Displaying Moderator Components */}
                <div onClick={() => handleClick('/create-classroom')}>Design Classroom</div>
                <div onClick={() => handleClick('/create-account')}>Create User Account</div>
                <ModeratorCreateAccount/>
                <ModeratorCreateClassroom/>
            </div>
        </div>
    )
}

export default ModeratorPortal;