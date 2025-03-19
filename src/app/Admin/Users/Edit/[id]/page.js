'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Cookies from "js-cookie";
import ImageCropper from '../ImageCropper'; // Adjust the import path as needed
import styles from '../../page.module.css';

export default function EditUserPage({ params }) {
  const router = useRouter();
  const userId = params.id;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
  });

  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateMessage, setUpdateMessage] = useState('');
  const [showCropper, setShowCropper] = useState(false);

  // API base URL
  const API_BASE_URL = 'http://192.168.0.197:5000';

  useEffect(() => {
    const authToken = Cookies.get("authToken");
    if (!authToken) {
      router.push("/Admin");
      return;
    }
    if (userId) {
      fetchUser();
    }
  }, [userId, router]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/users/`, {
        credentials: 'include',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const users = await response.json();
      const user = users.find(u => u.id === userId);

      if (!user) {
        throw new Error('User not found');
      }

      setFormData({
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        gender: user.gender,
      });

      if (user.profilePic) {
        setProfilePicPreview(`${API_BASE_URL}${user.profilePic}`);
      }

      setError(null);
    } catch (err) {
      setError('Failed to fetch user: ' + err.message);
      console.error('Error fetching user:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicPreview(reader.result);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = (croppedImage) => {
    setProfilePicPreview(croppedImage);
    setShowCropper(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formDataToSend = new FormData();

      // Append form fields
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      // Append profile pic if selected
      if (profilePicPreview) {
        const blob = await fetch(profilePicPreview).then(r => r.blob());
        const file = new File([blob], 'cropped_image.jpg', { type: 'image/jpeg' });
        formDataToSend.append('profilePic', file);
      }

      const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
        method: 'PUT',
        credentials: 'include',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update user');
      }

      const result = await response.json();
      setUpdateMessage('User updated successfully');

      // Redirect back to users list after a delay
      setTimeout(() => {
        router.push('/Admin/Users');
      }, 2000);

    } catch (err) {
      setError('Failed to update user: ' + err.message);
      console.error('Error updating user:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/Admin/Users');
  };

  if (loading && !formData.fullName) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingSpinner}>
          <div className={styles.spinner}></div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Edit User</h1>

      {error && (
        <div className={styles.errorAlert}>
          {error}
        </div>
      )}

      {updateMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {updateMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={styles.searchInput}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.searchInput}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={styles.searchInput}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={styles.searchInput}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={styles.searchInput}
              rows="3"
              required
            ></textarea>
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2">Profile Picture</label>
            <div className="flex items-center space-x-4">
              {profilePicPreview && !showCropper && (
                <Image
                  src={profilePicPreview || '/placeholder-avatar.png'} // Fallback to a placeholder if profilePicPreview is empty
                  alt="Profile Preview"
                  className="w-24 h-24 object-cover rounded-full border"
                  width={96} // Equivalent to w-24 (24 * 4px)
                  height={96} // Equivalent to h-24 (24 * 4px)
                />
              )}
              {showCropper && (
                <ImageCropper
                  imageSrc={profilePicPreview}
                  onCrop={handleCrop}
                  onCancel={() => setShowCropper(false)}
                />
              )}
              <input
                type="file"
                name="profilePic"
                onChange={handleProfilePicChange}
                className="block w-full text-gray-700 py-2"
                accept="image/*"
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">Leave empty to keep current picture</p>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update User'}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
