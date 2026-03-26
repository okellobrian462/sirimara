'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { ArrowLeft, Upload, X, Plus } from 'lucide-react';
import Link from 'next/link';
import ImageUpload from '@/components/admin/ImageUpload';

interface TaxonomyOption {
    id: string;
    name: string;
    slug: string;
}

interface PropertyFeature {
    id: string;
    name: string;
    category: string;
}

export default function NewPropertyPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [imageInput, setImageInput] = useState('');

    const [categories, setCategories] = useState<TaxonomyOption[]>([]);
    const [propertyTypes, setPropertyTypes] = useState<TaxonomyOption[]>([]);
    const [contractTypes, setContractTypes] = useState<TaxonomyOption[]>([]);
    const [features, setFeatures] = useState<PropertyFeature[]>([]);
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        city: '',
        address: '',
        state: '',
        zip_code: '',
        bedrooms: '',
        bathrooms: '',
        half_baths: '0',
        price: '',
        description: '',
        property_type_id: '',
        status: 'active',
        square_feet: '',
        lot_size: '',
        year_built: '',
        category_id: '',
        contract_type_id: '',
        is_featured: false,
    });

    useEffect(() => {
        async function fetchTaxonomy() {
            const supabase = createClient();
            
            const [{ data: cats }, { data: types }, { data: contracts }, { data: feats }] = await Promise.all([
                supabase.from('property_categories').select('id, name, slug').eq('is_active', true).order('order_index'),
                supabase.from('property_types').select('id, name, slug').eq('is_active', true).order('order_index'),
                supabase.from('property_contract_types').select('id, name, slug').eq('is_active', true).order('order_index'),
                supabase.from('property_features').select('id, name, category').eq('is_active', true).order('category').order('name'),
            ]);

            if (cats) setCategories(cats);
            if (types) setPropertyTypes(types);
            if (contracts) setContractTypes(contracts);
            if (feats) setFeatures(feats);
        }

        fetchTaxonomy();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));

            if (name === 'title' && !formData.slug) {
                const slug = value
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-|-$/g, '');
                setFormData(prev => ({ ...prev, slug }));
            }
        }
    };

    const handleAddImage = () => {
        if (imageInput.trim()) {
            setImages(prev => [...prev, imageInput.trim()]);
            setImageInput('');
        }
    };

    const handleRemoveImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const toggleFeature = (featureId: string) => {
        setSelectedFeatures(prev => 
            prev.includes(featureId) 
                ? prev.filter(id => id !== featureId)
                : [...prev, featureId]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const supabase = createClient();

            const propertyData = {
                ...formData,
                bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
                bathrooms: formData.bathrooms ? parseFloat(formData.bathrooms) : null,
                half_baths: formData.half_baths ? parseInt(formData.half_baths) : 0,
                price: parseFloat(formData.price),
                square_feet: formData.square_feet ? parseInt(formData.square_feet) : null,
                lot_size: formData.lot_size ? parseFloat(formData.lot_size) : null,
                year_built: formData.year_built ? parseInt(formData.year_built) : null,
                images,
            };

            const { data: newProperty, error: insertError } = await supabase
                .from('properties')
                .insert([propertyData])
                .select()
                .single();

            if (insertError) throw insertError;

            if (newProperty && selectedFeatures.length > 0) {
                const featureLinks = selectedFeatures.map(featureId => ({
                    property_id: newProperty.id,
                    feature_id: featureId,
                }));
                
                await supabase.from('property_feature_links').insert(featureLinks);
            }

            router.push('/admin/properties');
            router.refresh();
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to create property';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const featuresByCategory = features.reduce((acc, feature) => {
        const cat = feature.category || 'general';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(feature);
        return acc;
    }, {} as Record<string, PropertyFeature[]>);

    return (
        <div className="p-8">
            <div className="mb-8">
                <Link href="/admin/properties" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Properties
                </Link>
                <h1 className="text-3xl font-light tracking-[0.15em] text-gray-900 mb-2">ADD NEW PROPERTY</h1>
                <p className="text-gray-500">Create a new property listing</p>
            </div>

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
                            <label className="block text-sm font-medium text-gray-700 mb-2">Property Title *</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="Luxury Penthouse with City Views" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
                            <input type="text" name="slug" value={formData.slug} onChange={handleChange} required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="luxury-penthouse-city-views" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                            <input type="text" name="city" value={formData.city} onChange={handleChange} required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                            <input type="text" name="address" value={formData.address} onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Property Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select name="category_id" value={formData.category_id} onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white">
                                <option value="">Select category</option>
                                {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                            <select name="property_type_id" value={formData.property_type_id} onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white">
                                <option value="">Select type</option>
                                {propertyTypes.map(type => <option key={type.id} value={type.id}>{type.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Contract Type</label>
                            <select name="contract_type_id" value={formData.contract_type_id} onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white">
                                <option value="">Select contract</option>
                                {contractTypes.map(ct => <option key={ct.id} value={ct.id}>{ct.name}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {features.length > 0 && (
                    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Features</h2>
                        {Object.entries(featuresByCategory).map(([category, categoryFeatures]) => (
                            <div key={category} className="mb-4">
                                <h3 className="text-sm font-medium text-gray-600 uppercase mb-2">{category}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {categoryFeatures.map(feature => (
                                        <button key={feature.id} type="button" onClick={() => toggleFeature(feature.id)}
                                            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${selectedFeatures.includes(feature.id) ? 'bg-orange-100 text-orange-700 border-2 border-orange-300' : 'bg-gray-100 text-gray-600 border-2 border-gray-200'}`}>
                                            {selectedFeatures.includes(feature.id) ? '✓ ' : ''}{feature.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
                    <h2 className="text-lg font-medium text-gray-900 mb-6">Images</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <ImageUpload bucket="property-images" onUpload={(url) => setImages(prev => [...prev, url])} description="Upload property photos" />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Add Via URL</label>
                            <div className="flex gap-2">
                                <input type="url" value={imageInput} onChange={(e) => setImageInput(e.target.value)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
                                <button type="button" onClick={handleAddImage} className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                    {images.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {images.map((image, index) => (
                                <div key={index} className="relative group">
                                    <img src={image} alt={`Property ${index + 1}`} className="w-full h-32 object-cover rounded-lg border border-gray-200" />
                                    <button type="button" onClick={() => handleRemoveImage(index)} className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex gap-4">
                    <button type="submit" disabled={loading} className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50">
                        {loading ? 'Creating...' : 'Create Property'}
                    </button>
                    <Link href="/admin/properties" className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">Cancel</Link>
                </div>
            </form>
        </div>
    );
}
