'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import ImageUpload from '@/components/admin/ImageUpload';
import { ArrowLeft, X, Plus } from 'lucide-react';

interface EditAgentPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function EditAgentPage({ params }: EditAgentPageProps) {
    const { id } = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [specialtyInput, setSpecialtyInput] = useState('');
    const [languageInput, setLanguageInput] = useState('');

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        title: '',
        phone: '',
        email: '',
        bio: '',
        instagram: '',
        twitter: '',
        linkedin: '',
        is_featured: false,
        featured_order: 0,
        specialties: [] as string[],
        languages: [] as string[],
        profile_intro: '',
        profile_experience: '',
        profile_capabilities: '',
        profile_admissions: '',
        profile_qualifications: '',
    });

    useEffect(() => {
        async function fetchAgent() {
            try {
                const supabase = createClient();
                const { data, error } = await supabase
                    .from('agents')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;

                if (data) {
                    setFormData({
                        first_name: data.first_name || '',
                        last_name: data.last_name || '',
                        title: data.title || '',
                        phone: data.phone || '',
                        email: data.email || '',
                        bio: data.bio || '',
                        instagram: data.social_links?.instagram || '',
                        twitter: data.social_links?.twitter || '',
                        linkedin: data.social_links?.linkedin || '',
                        is_featured: data.is_featured || false,
                        featured_order: data.featured_order || 0,
                        specialties: data.specialties || [],
                        languages: data.languages || [],
                        profile_intro: data.profile_data?.intro || '',
                        profile_experience: data.profile_data?.experience || '',
                        profile_capabilities: (data.profile_data?.capabilities || []).join('\n'),
                        profile_admissions: (data.profile_data?.admissions || []).join('\n'),
                        profile_qualifications: (data.profile_data?.academic_qualifications || []).join('\n'),
                    });
                    setPhotoUrl(data.photo_url || '');
                }
            } catch (err: unknown) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to fetch agent';
                setError(errorMessage);
            } finally {
                setFetching(false);
            }
        }

        fetchAgent();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else if (type === 'number') {
            setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
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

    const handleAddLanguage = () => {
        if (languageInput.trim() && !formData.languages.includes(languageInput.trim())) {
            setFormData(prev => ({
                ...prev,
                languages: [...prev.languages, languageInput.trim()]
            }));
            setLanguageInput('');
        }
    };

    const handleRemoveLanguage = (language: string) => {
        setFormData(prev => ({
            ...prev,
            languages: prev.languages.filter(l => l !== language)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const supabase = createClient();

            // Extract profile fields from formData
            const { 
                profile_intro, 
                profile_experience, 
                profile_capabilities, 
                profile_admissions, 
                profile_qualifications, 
                instagram,
                twitter,
                linkedin,
                ...restFormData 
            } = formData;

            const agentData = {
                ...restFormData,
                photo_url: photoUrl,
                social_links: {
                    instagram,
                    twitter,
                    linkedin,
                },
                profile_data: {
                    intro: profile_intro,
                    experience: profile_experience,
                    capabilities: profile_capabilities.split('\n').map(s => s.trim()).filter(Boolean),
                    admissions: profile_admissions.split('\n').map(s => s.trim()).filter(Boolean),
                    academic_qualifications: profile_qualifications.split('\n').map(s => s.trim()).filter(Boolean),
                }
            };

            const { error: updateError } = await supabase
                .from('agents')
                .update(agentData)
                .eq('id', id);

            if (updateError) throw updateError;

            router.push('/admin/agents');
            router.refresh();
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to update agent';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="p-8">
                <div className="flex items-center justify-center py-12">
                    <div className="text-gray-500">Loading agent...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <Link
                    href="/admin/agents"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 text-sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Agents
                </Link>
                <h1 className="text-3xl font-light tracking-[0.15em] text-gray-900 mb-2">
                    EDIT AGENT
                </h1>
                <p className="text-gray-500">
                    Update agent profile information
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="max-w-4xl">
                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
                        {error}
                    </div>
                )}

                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name *
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    required
                                    placeholder="First name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                                <input
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Last name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g., Licensed Associate Real Estate Broker"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone *
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
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

                {/* Extended Profile Data for Tabs */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
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

                {/* Featured Section */}
                <div className="bg-orange-50 rounded-xl border border-orange-200 p-6 mb-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Featured Agent</h2>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="is_featured"
                                name="is_featured"
                                checked={formData.is_featured}
                                onChange={handleChange}
                                className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                            />
                            <label htmlFor="is_featured" className="text-sm font-medium text-gray-700">
                                Mark as Featured Agent
                            </label>
                        </div>

                        {formData.is_featured && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Featured Display Order
                                </label>
                                <input
                                    type="number"
                                    name="featured_order"
                                    value={formData.featured_order}
                                    onChange={handleChange}
                                    min="0"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                                <p className="mt-1 text-xs text-gray-500">
                                    Lower numbers appear first
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Specialties & Languages */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Specialties & Languages</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Specialties
                            </label>
                            <div className="flex gap-2 mb-3">
                                <input
                                    type="text"
                                    value={specialtyInput}
                                    onChange={(e) => setSpecialtyInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSpecialty())}
                                    placeholder="e.g., Luxury Homes, Condos"
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddSpecialty}
                                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.specialties.map((specialty) => (
                                    <span
                                        key={specialty}
                                        className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm"
                                    >
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
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Languages
                            </label>
                            <div className="flex gap-2 mb-3">
                                <input
                                    type="text"
                                    value={languageInput}
                                    onChange={(e) => setLanguageInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddLanguage())}
                                    placeholder="e.g., English, Spanish"
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddLanguage}
                                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.languages.map((language) => (
                                    <span
                                        key={language}
                                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                    >
                                        {language}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveLanguage(language)}
                                            className="hover:text-blue-900"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Media */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Social Media</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Instagram URL
                            </label>
                            <input
                                type="url"
                                name="instagram"
                                value={formData.instagram}
                                onChange={handleChange}
                                placeholder="https://instagram.com/..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Twitter URL
                            </label>
                            <input
                                type="url"
                                name="twitter"
                                value={formData.twitter}
                                onChange={handleChange}
                                placeholder="https://twitter.com/..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                LinkedIn URL
                            </label>
                            <input
                                type="url"
                                name="linkedin"
                                value={formData.linkedin}
                                onChange={handleChange}
                                placeholder="https://linkedin.com/in/..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Profile Image */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Profile Image</h2>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                Upload From Computer
                            </label>
                            <ImageUpload
                                bucket="agent-photos"
                                onUpload={setPhotoUrl}
                                currentImage={photoUrl}
                                description="Upload agent profile photo (JPG, PNG, WEBP)"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                Or Paste Image URL
                            </label>
                            <input
                                type="url"
                                value={photoUrl}
                                onChange={(e) => setPhotoUrl(e.target.value)}
                                placeholder="https://..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        {photoUrl && (
                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <label className="block text-xs font-medium text-gray-700 mb-2">
                                    Preview
                                </label>
                                <img
                                    src={photoUrl}
                                    alt="Profile preview"
                                    className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
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
