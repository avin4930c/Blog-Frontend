import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LoadingComponent from './loadingComponent'; // Make sure to import your LoadingComponent

function EditProfileMain() {
    const { user, authToken } = useContext(AuthContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [file, setFile] = useState(null); // State for file upload
    const [avatarUrl, setAvatarUrl] = useState('');
    const [bio, setBio] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Navigation hook

    useEffect(() => {
        if (user) {
            setFirstName(user.first_name || '');
            setLastName(user.last_name || '');
            setEmail(user.mail_address || '');
            setAvatarUrl(user.imgUrl || '');
            setBio(user.bio || '');
            setLoading(false);
        }
    }, [user]);

    const uploadFileToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (response.ok) {
                return data.secure_url;
            } else {
                console.error('Error uploading file:', data.error.message);
                return null;
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            return null;
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setAvatarUrl('');
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const formErrors = validateForm();

        if (Object.keys(formErrors).length === 0) {
            const data = {
                first_name: firstName,
                last_name: lastName,
                imgUrl: avatarUrl,
                bio,
            };

            if (file) {
                const uploadedUrl = await uploadFileToCloudinary(file);
                if (uploadedUrl) {
                    data.imgUrl = uploadedUrl;
                } else {
                    setErrors({ msg: 'Failed to upload image' });
                    return;
                }
            } else if (avatarUrl) {
                data.imgUrl = avatarUrl;
            }

            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/user/updateUser`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`,
                    },
                    body: JSON.stringify(data),
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        setErrors({ msg: 'Unauthorized: Unable to update profile' });
                    } else {
                        const result = await response.json();
                        setErrors(result.errors);
                    }
                    return;
                }

                navigate('/');
            } catch (error) {
                console.error('Error updating profile:', error);
                setErrors({ msg: 'Error updating profile' });
            }
        } else {
            setErrors(formErrors);
        }
    }

    const validateForm = () => {
        let formErrors = {};

        if (!firstName.trim()) {
            formErrors.firstName = 'First name is required';
        }
        if (!lastName.trim()) {
            formErrors.lastName = 'Last name is required';
        }
        if (!email.trim()) {
            formErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            formErrors.email = 'Email address is invalid';
        }

        if (avatarUrl && !isValidUrl(avatarUrl)) {
            formErrors.avatarUrl = 'Avatar URL is invalid';
        }

        return formErrors;
    };

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    };

    if (loading) {
        return (<LoadingComponent />);
    }

    return (
        <section className="py-10">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Profile</h1>
                {errors.msg && <p className="text-red-500 text-sm mb-4">{errors.msg}</p>}
                <form onSubmit={handleSubmit} className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className={`mt-1 py-2 px-3 w-full rounded-md border ${errors.firstName ? 'border-red-500' : 'border-gray-300'
                                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder="Enter your first name"
                        />
                        {errors.firstName && (
                            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                        )}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className={`mt-1 py-2 px-3 w-full rounded-md border ${errors.lastName ? 'border-red-500' : 'border-gray-300'
                                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder="Enter your last name"
                        />
                        {errors.lastName && (
                            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                        )}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            disabled
                            onChange={(e) => setEmail(e.target.value)}
                            className={`mt-1 py-2 px-3 w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'
                                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder="Enter your email address"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div className="col-span-6">
                        <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                            Avatar Upload
                        </label>
                        <input
                            type="file"
                            id="avatar"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="mt-1 py-2 px-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {file && (
                            <p className="text-gray-500 text-sm mt-1">Selected: {file.name}</p>
                        )}
                    </div>

                    <div className="col-span-6">
                        <label htmlFor="avatarUrl" className="block text-sm font-medium text-gray-700">
                            Or Enter Avatar URL
                        </label>
                        <input
                            type="text"
                            id="avatarUrl"
                            value={avatarUrl}
                            onChange={(e) => setAvatarUrl(e.target.value)}
                            className={`mt-1 py-2 px-3 w-full rounded-md border ${errors.avatarUrl ? 'border-red-500' : 'border-gray-300'
                                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder="Enter URL for your avatar"
                        />
                        {errors.avatarUrl && (
                            <p className="text-red-500 text-sm mt-1">{errors.avatarUrl}</p>
                        )}
                    </div>

                    <div className="col-span-6">
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                            Bio
                        </label>
                        <textarea
                            id="bio"
                            rows="4"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className={`mt-1 py-2 px-3 w-full rounded-md border ${errors.bio ? 'border-red-500' : 'border-gray-300'
                                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder="Write a short bio about yourself"
                        ></textarea>
                        {errors.bio && (
                            <p className="text-red-500 text-sm mt-1">{errors.bio}</p>
                        )}
                    </div>

                    <div className="col-span-6 flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default EditProfileMain;