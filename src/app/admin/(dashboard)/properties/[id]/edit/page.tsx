'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import ImageUpload from '@/components/admin/ImageUpload';
import { ArrowLeft, Upload, X, Plus } from 'lucide-react';

interface EditPropertyPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function EditPropertyPage({ params }: EditPropertyPageProps) {
    const { id } = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [imageInput, setImageInput] = useState('');

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
        type_id: '',
        status: 'active',
        square_feet: '',
        lot_size: '',
        year_built: '',
        category_id: '',
        contract_type_id: '',
        is_featured: false,
    });

    // Taxonomy state
    const [categories, setCategories] = useState<{id: string; name: string}[]>([]);
    const [propertyTypes, setPropertyTypes] = useState<{id: string; name: string}[]>([]);
    const [contractTypes, setContractTypes] = useState<{id: string; name: string}[]>([]);
    const [features, setFeatures] = useState<{id: string; name: string; category: string}[]>([]);
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const supabase = createClient();
                
                // Fetch property
                const { data, error } = await supabase
                    .from('properties')
                    .select(`*, property_feature_links(feature_id)`)
                    .eq('id', id)
                    .single();

                if (error) throw error;

                // Fetch taxonomy options
                const [{ data: cats }, { data: types }, { data: contracts }, { data: feats }] = await Promise.all([
                    supabase.from('property_categories').select('id, name').eq('is_active', true).order('order_index'),
                    supabase.from('property_types').select('id, name').eq('is_active', true).order('order_index'),
                    supabase.from('property_contract_types').select('id, name').eq('is_active', true).order('order_index'),
                    supabase.from('property_features').select('id, name, category').eq('is_active', true).order('category').order('name'),
                ]);

                if (cats) setCategories(cats);
                if (types) setPropertyTypes(types);
                if (contracts) setContractTypes(contracts);
                if (feats) setFeatures(feats);

                if (data) {
                    setFormData({
                        title: data.title || '',
                        slug: data.slug || '',
                        city: data.city || '',
                        address: data.address || '',
                        state: data.state || '',
                        zip_code: data.zip_code || '',
                        bedrooms: data.bedrooms?.toString() || '',
                        bathrooms: data.bathrooms?.toString() || '',
                        half_baths: data.half_baths?.toString() || '0',
                        price: data.price?.toString() || '',
                        description: data.description || '',
                        type_id: data.type_id || '',
                        status: data.status || 'active',
                        square_feet: data.square_feet?.toString() || '',
                        lot_size: data.lot_size?.toString() || '',
                        year_built: data.year_built?.toString() || '',
                        category_id: data.category_id || '',
                        contract_type_id: data.contract_type_id || '',
                        is_featured: data.is_featured || false,
                    });
                    setImages(data.images || []);
                    
                    // Set selected features from property_feature_links
                    const linkedFeatures = data.property_feature_links?.map((link: {feature_id: string}) => link.feature_id) || [];
                    setSelectedFeatures(linkedFeatures);
                }
            } catch (err: unknown) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to fetch property';
                setError(errorMessage);
            } finally {
                setFetching(false);
            }
        }

        fetchData();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
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
                category_id: formData.category_id || null,
                type_id: formData.type_id || null,
                contract_type_id: formData.contract_type_id || null,
            };

            const { error: updateError } = await supabase
                .from('properties')
                .update(propertyData)
                .eq('id', id);

            if (updateError) throw updateError;

            // Update feature links - delete existing and insert new
            await supabase.from('property_feature_links').delete().eq('property_id', id);
            
            if (selectedFeatures.length > 0) {
                const featureLinks = selectedFeatures.map(featureId => ({
                    property_id: id,
                    feature_id: featureId,
                }));
                await supabase.from('property_feature_links').insert(featureLinks);
            }

            router.push('/admin/properties');
            router.refresh();
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to update property';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="p-8">
                <div className="flex items-center justify-center py-12">
                    <div className="text-gray-500">Loading property...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <Link
                    href="/admin/properties"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 text-sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Properties
                </Link>
                <h1 className="text-3xl font-light tracking-[0.15em] text-gray-900 mb-2">
                    EDIT PROPERTY
                </h1>
                <p className="text-gray-500">
                    Update property listing details
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
                                Property Title *
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Slug *
                            </label>
                            <input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                City *
                            </label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Address
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                State
                            </label>
                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ZIP Code
                            </label>
                            <input
                                type="text"
                                name="zip_code"
                                value={formData.zip_code}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Property Details</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Bedrooms
                            </label>
                            <input
                                type="number"
                                name="bedrooms"
                                value={formData.bedrooms}
                                onChange={handleChange}
                                min="0"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Bathrooms
                            </label>
                            <input
                                type="number"
                                name="bathrooms"
                                value={formData.bathrooms}
                                onChange={handleChange}
                                min="0"
                                step="0.5"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Half Baths
                            </label>
                            <input
                                type="number"
                                name="half_baths"
                                value={formData.half_baths}
                                onChange={handleChange}
                                min="0"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Price *
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                min="0"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Square Feet
                            </label>
                            <input
                                type="number"
                                name="square_feet"
                                value={formData.square_feet}
                                onChange={handleChange}
                                min="0"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Year Built
                            </label>
                            <input
                                type="number"
                                name="year_built"
                                value={formData.year_built}
                                onChange={handleChange}
                                min="1800"
                                max={new Date().getFullYear()}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                name="category_id"
                                value={formData.category_id}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                            >
                                <option value="">Select category</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Property Type
                            </label>
                            <select
                                name="type_id"
                                value={formData.type_id}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                            >
                                <option value="">Select type</option>
                                {propertyTypes.map(type => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Contract Type
                            </label>
                            <select
                                name="contract_type_id"
                                value={formData.contract_type_id}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                            >
                                <option value="">Select contract</option>
                                {contractTypes.map(ct => (
                                    <option key={ct.id} value={ct.id}>{ct.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status *
                            </label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                            >
                                <option value="active">Active</option>
                                <option value="pending">Pending</option>
                                <option value="sold">Sold</option>
                                <option value="off-market">Off Market</option>
                            </select>
                        </div>

                        <div className="flex items-end">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="is_featured"
                                    checked={formData.is_featured}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                                />
                                <span className="text-sm font-medium text-gray-700">
                                    Featured Property
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                </div>

                {/* Features Section */}
                {features.length > 0 && (
                    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Features & Amenities</h2>
                        {Object.entries(features.reduce((acc, feature) => {
                            const cat = feature.category || 'general';
                            if (!acc[cat]) acc[cat] = [];
                            acc[cat].push(feature);
                            return acc;
                        }, {} as Record<string, typeof features>)).map(([category, categoryFeatures]) => (
                            <div key={category} className="mb-4">
                                <h3 className="text-sm font-medium text-gray-600 uppercase mb-2">{category}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {categoryFeatures.map(feature => (
                                        <button
                                            key={feature.id}
                                            type="button"
                                            onClick={() => toggleFeature(feature.id)}
                                            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                                                selectedFeatures.includes(feature.id)
                                                    ? 'bg-orange-100 text-orange-700 border-2 border-orange-300'
                                                    : 'bg-gray-100 text-gray-600 border-2 border-gray-200 hover:bg-gray-200'
                                            }`}
                                        >
                                            {selectedFeatures.includes(feature.id) ? '✓ ' : ''}
                                            {feature.name}
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
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Upload From Computer
                            </label>
                            <ImageUpload
                                bucket="property-images"
                                onUpload={(url) => setImages(prev => [...prev, url])}
                                description="Upload property photos (JPG, PNG, WEBP)"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Add Via URL
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="url"
                                    value={imageInput}
                                    onChange={(e) => setImageInput(e.target.value)}
                                    placeholder="https://example.com/image.jpg"
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddImage}
                                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors shrink-0"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>
                            <p className="mt-2 text-xs text-gray-500">
                                Paste a direct link to an image file
                            </p>
                        </div>
                    </div>

                    {images.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {images.map((image, index) => (
                                <div key={index} className="relative group">
                                    <img
                                        src={image}
                                        alt={`Property ${index + 1}`}
                                        className="w-full h-32 object-cover rounded-lg border border-gray-200"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
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
                        href="/admin/properties"
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}
