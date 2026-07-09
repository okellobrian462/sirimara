'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { ArrowLeft, Upload, X, Plus } from 'lucide-react';
import Link from 'next/link';
import ImageUpload from '@/components/admin/ImageUpload';

export default function NewAgentPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [specialtyInput, setSpecialtyInput] = useState('');

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        bio: '',
        title: '',
        specialties: [] as string[],
        linkedin: '',
        twitter: '',
        instagram: '',
        is_active: true,
        profile_intro: '',
        profile_experience: '',
        profile_capabilities: '',
        profile_admissions: '',
        profile_qualifications: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleAddSpecialty = () => {
        if (specialtyInput.trim() && !formData.specialties.includes(specialtyInput.trim())) {
            setFormData(prev => ({
                ...prev,
                specialties: [...prev.specialties, specialtyInput.trim()]
            }));
            setSpecialtyInput('');
        }
    };

    const handleRemoveSpecialty = (specialty: string) => {
        setFormData(prev => ({
            ...prev,
            specialties: prev.specialties.filter(s => s !== specialty)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const supabase = createClient();

            const agentData = {
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                phone: formData.phone,
                bio: formData.bio,
                title: formData.title,
                photo_url: photoUrl,
                specialties: formData.specialties,
                social_links: {
                    linkedin: formData.linkedin,
                    twitter: formData.twitter,
                    instagram: formData.instagram
                },
                is_active: formData.is_active,
                profile_data: {
                    intro: formData.profile_intro,
                    experience: formData.profile_experience,
                    capabilities: formData.profile_capabilities.split('\n').map(s => s.trim()).filter(Boolean),
                    admissions: formData.profile_admissions.split('\n').map(s => s.trim()).filter(Boolean),
                    academic_qualifications: formData.profile_qualifications.split('\n').map(s => s.trim()).filter(Boolean),
                }
            };

            const { error: insertError } = await supabase
                .from('agents')
                .insert([agentData]);

            if (insertError) throw insertError;

            router.push('/admin/agents');
            router.refresh();
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to create agent';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8">
            {}
            <div className="mb-8">
                <Link
                    href="/admin/agents"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Agents
                </Link>
                <h1 className="text-3xl font-light tracking-[0.15em] text-gray-900 mb-2">
                    ADD NEW AGENT
                </h1>
                <p className="text-gray-500">
                    Add a new real estate agent to the team
                </p>
            </div>

            {}
            <form onSubmit={handleSubmit} className="max-w-4xl">
                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        First Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Last Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="e.g. Senior Broker"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Bio
                                    </label>
                                    <textarea
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {}
                        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">Extended Profile (Tabs)</h2>
                            <p className="text-sm text-gray-500 mb-6">These fields populate the Experience, Capabilities, and Credentials tabs.</p>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Intro Paragraph
                                    </label>
                                    <textarea
                                        name="profile_intro"
                                        value={formData.profile_intro}
                                        onChange={handleChange}
                                        rows={2}
                                        placeholder="E.g., Halima has expertise in commercial transactions..."
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Experience Text
                                    </label>
                                    <textarea
                                        name="profile_experience"
                                        value={formData.profile_experience}
                                        onChange={handleChange}
                                        rows={5}
                                        placeholder="Detailed block of text describing experience..."
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Capabilities (1 per line)
                                        </label>
                                        <textarea
                                            name="profile_capabilities"
                                            value={formData.profile_capabilities}
                                            onChange={handleChange}
                                            rows={5}
                                            placeholder="Corporate Law&#10;Islamic Banking&#10;Family law"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 whitespace-pre"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Admissions (1 per line)
                                        </label>
                                        <textarea
                                            name="profile_admissions"
                                            value={formData.profile_admissions}
                                            onChange={handleChange}
                                            rows={5}
                                            placeholder="Advocate of the High Court of Kenya"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 whitespace-pre"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Academic Qualifications (1 per line)
                                        </label>
                                        <textarea
                                            name="profile_qualifications"
                                            value={formData.profile_qualifications}
                                            onChange={handleChange}
                                            rows={5}
                                            placeholder="Master of Laws (Distinction)...&#10;Bachelor of Laws..."
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 whitespace-pre"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">Specialties</h2>

                            <div className="flex gap-2 mb-4">
                                <input
                                    type="text"
                                    value={specialtyInput}
                                    onChange={(e) => setSpecialtyInput(e.target.value)}
                                    placeholder="Add specialty (e.g. Luxury, Condos)"
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleAddSpecialty();
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={handleAddSpecialty}
                                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {formData.specialties.map((specialty, index) => (
                                    <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-orange-50 text-orange-700 rounded-full border border-orange-100 text-sm">
                                        {specialty}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveSpecialty(specialty)}
                                            className="hover:text-orange-900"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                                {formData.specialties.length === 0 && (
                                    <p className="text-gray-400 text-sm italic">No specialties added yet</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">Profile Photo</h2>

                            <div className="mb-4">
                                {photoUrl ? (
                                    <div className="relative w-full aspect-square mb-4 rounded-lg overflow-hidden border border-gray-200">
                                        <img
                                            src={photoUrl}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setPhotoUrl('')}
                                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="w-full aspect-square mb-4 rounded-lg bg-gray-50 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                                        <div className="text-center p-4">
                                            <Upload className="w-8 h-8 mx-auto mb-2" />
                                            <span className="text-sm">No photo uploaded</span>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <label className="block text-xs font-medium text-gray-700 mb-2">
                                        Upload From Computer
                                    </label>
                                    <ImageUpload
                                        bucket="agent-photos"
                                        onUpload={(url) => setPhotoUrl(url)}
                                        description="Upload profile photo"
                                        className="mb-4"
                                    />
                                    <label className="block text-xs font-medium text-gray-700 mb-2">
                                        Or Paste Image URL
                                    </label>
                                    <input
                                        type="url"
                                        value={photoUrl}
                                        onChange={(e) => setPhotoUrl(e.target.value)}
                                        placeholder="https://..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">Social Media</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        LinkedIn
                                    </label>
                                    <input
                                        type="url"
                                        name="linkedin"
                                        value={formData.linkedin}
                                        onChange={handleChange}
                                        placeholder="LinkedIn Profile URL"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Twitter / X
                                    </label>
                                    <input
                                        type="url"
                                        name="twitter"
                                        value={formData.twitter}
                                        onChange={handleChange}
                                        placeholder="Twitter Profile URL"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Instagram
                                    </label>
                                    <input
                                        type="url"
                                        name="instagram"
                                        value={formData.instagram}
                                        onChange={handleChange}
                                        placeholder="Instagram Profile URL"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-900">Active Status</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="is_active"
                                        checked={formData.is_active}
                                        onChange={handleChange}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                                </label>
                            </div>
                            <p className="mt-2 text-xs text-gray-500">
                                Inactive agents won't appear on the public site.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 mt-8">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                        {loading ? 'Creating...' : 'Create Agent'}
                    </button>
                    <Link
                        href="/admin/agents"
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}
