import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext.tsx';
import { Mail, Lock, User, Phone, Calendar, AlertCircle, CheckCircle, Globe, Save } from 'lucide-react';
import './ProfilePage.css';

interface ProfileFormData {
  firstName: string;
  lastName: string;
  phone: string;
  birthDate: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  language: string;
}

function ProfilePage() {
  const navigate = useNavigate();
  const { customer, setCustomer } = useUser();
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: '',
    lastName: '',
    phone: '',
    birthDate: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    language: 'es',
  });

  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // Verificar autenticación
  useEffect(() => {
    if (!customer) {
      navigate('/login');
    }
  }, [customer, navigate]);

  // Cargar datos del usuario
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setIsFetching(true);
        const response = await fetch('http://localhost:3000/api/auth/me', {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to load user data');
        }

        const data = await response.json();
        if (data.customer) {
          setFormData((prev) => ({
            ...prev,
            firstName: data.customer.firstName || '',
            lastName: data.customer.lastName || '',
            phone: data.customer.phone || '',
            birthDate: data.customer.birthDate || '',
            email: data.customer.email || '',
          }));
        }
      } catch (err) {
        console.error('Error loading user data:', err);
      } finally {
        setIsFetching(false);
      }
    };

    if (customer) {
      loadUserData();
    }
  }, [customer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
    setSuccess('');
  };

  const validateForm = (): boolean => {
    if (!formData.firstName.trim()) {
      setError('First name is required');
      return false;
    }

    if (!formData.lastName.trim()) {
      setError('Last name is required');
      return false;
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (formData.phone && !formData.phone.match(/^[0-9\s\-\+\(\)]{7,}$/)) {
      setError('Please enter a valid phone number');
      return false;
    }

    if (showPasswordSection) {
      if (!formData.currentPassword) {
        setError('Please enter your current password');
        return false;
      }

      if (!formData.newPassword) {
        setError('Please enter a new password');
        return false;
      }

      if (formData.newPassword.length < 6) {
        setError('New password must be at least 6 characters');
        return false;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const updateData: any = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        birthDate: formData.birthDate,
        email: formData.email,
      };

      if (showPasswordSection && formData.newPassword) {
        updateData.currentPassword = formData.currentPassword;
        updateData.newPassword = formData.newPassword;
      }

      const response = await fetch('http://localhost:3000/api/users/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update profile');
      }

      const data = await response.json();

      if (data.customer) {
        setCustomer(data.customer);
      }

      setFormData((prev) => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
      setShowPasswordSection(false);

      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading your profile...</p>
          </div>
        </div>
      </div>
    );
  }

  const languages = [
    { value: 'es', label: 'Español' },
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' },
  ];

  return (
    <div className="profile-page">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(transparent,transparent_2px,#fff_3px,#fff_3px)] mix-blend-overlay"></div>
      </div>

      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              <User size={40} />
            </div>
            <div className="profile-title">
              <h1>Edit <span className="text-cyan-400">Profile</span></h1>
              <p>Update your personal information and preferences</p>
            </div>
          </div>

          {error && (
            <div className="alert alert-error">
              <AlertCircle size={20} />
              {error}
            </div>
          )}

          {success && (
            <div className="alert alert-success">
              <CheckCircle size={20} />
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-section">
              <h2 className="section-title">Personal Information</h2>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <div className="input-wrapper">
                    <User size={20} className="input-icon" />
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Your first name"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <div className="input-wrapper">
                    <User size={20} className="input-icon" />
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Your last name"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <div className="input-wrapper">
                    <Phone size={20} className="input-icon" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+34 123 456 789"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="birthDate">Date of Birth</label>
                  <div className="input-wrapper">
                    <Calendar size={20} className="input-icon" />
                    <input
                      type="date"
                      id="birthDate"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2 className="section-title">Contact Information</h2>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-wrapper">
                  <Mail size={20} className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="section-header">
                <h2 className="section-title">Security & Password</h2>
                <button
                  type="button"
                  onClick={() => setShowPasswordSection(!showPasswordSection)}
                  className="toggle-password-btn"
                  disabled={isLoading}
                >
                  <Lock size={16} />
                  {showPasswordSection ? 'Cancel' : 'Change Password'}
                </button>
              </div>

              {showPasswordSection && (
                <div className="form-grid">
                  <div className="form-group form-group-full">
                    <label htmlFor="currentPassword">Current Password</label>
                    <div className="input-wrapper">
                      <Lock size={20} className="input-icon" />
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        placeholder="Enter your current password"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <div className="input-wrapper">
                      <Lock size={20} className="input-icon" />
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="Enter new password"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className="input-wrapper">
                      <Lock size={20} className="input-icon" />
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm new password"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="form-section">
              <h2 className="section-title">Preferences</h2>

              <div className="form-group">
                <label htmlFor="language">Language</label>
                <div className="input-wrapper select-wrapper">
                  <Globe size={20} className="input-icon" />
                  <select
                    id="language"
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    disabled={isLoading}
                  >
                    {languages.map((lang) => (
                      <option key={lang.value} value={lang.value}>
                        {lang.label}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="form-hint">Language support will be available in a future update</p>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn btn-secondary"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                <Save size={20} />
                {isLoading ? 'Saving Changes...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
