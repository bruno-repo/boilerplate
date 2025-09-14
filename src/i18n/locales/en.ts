export default {
  translation: {
    common: {
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      username: 'Username',
      loading: 'Loading...',
      saving: 'Saving...',
      updating: 'Updating...',
      saveChanges: 'Save Changes',
      cancel: 'Cancel',
      continue: 'Continue',
      getStarted: 'Get Started',
      learnMore: 'Learn More',
      backToHome: 'Back to Home',
      goBack: 'Go Back',
      actions: 'Actions',
      verified: 'Verified',
      notVerified: 'Not Verified',
      allRightsReserved: 'All rights reserved.',
    },
    
    validation: {
      required: 'This field is required',
      email: 'Please enter a valid email address',
      minLength: 'Must be at least {{length}} characters',
      maxLength: 'Must be at most {{length}} characters',
      exactLength: 'Must be exactly {{length}} characters',
      passwordsMatch: 'Passwords must match',
      alphanumeric: 'Only letters, numbers, and underscores allowed',
      uppercase: 'Must contain at least one uppercase letter',
      lowercase: 'Must contain at least one lowercase letter',
      number: 'Must contain at least one number',
      special: 'Must contain at least one special character (@$!%*?&)',
      numeric: 'Must contain only numbers',
    },
    
    theme: {
      toggle: 'Toggle theme',
      light: 'Light',
      dark: 'Dark',
      system: 'System',
    },
    
    language: {
      toggle: 'Change language',
      english: 'English',
      spanish: 'Spanish',
    },
    
    home: {
      dashboard: 'Dashboard',
      hero: {
        title: 'Pro Boilerplate',
        subtitle: 'A complete authentication boilerplate with user management, session control, and profile customization.',
      },
      features: {
        secure: {
          title: 'Secure Authentication',
          description: 'Enterprise-grade security with JWT tokens, password hashing, and email verification.',
        },
        tokens: {
          title: 'Token Management',
          description: 'Automatic token refresh, expiration handling, and secure storage.',
        },
        sessions: {
          title: 'Session Control',
          description: 'View and manage all active sessions across different devices.',
        },
      },
    },
    
    nav: {
      dashboard: 'Dashboard',
      profile: 'Profile',
      sessions: 'Sessions',
    },
    
    auth: {
      login: {
        title: 'Welcome back',
        subtitle: 'Enter your credentials to access your account',
        noAccount: 'Don\'t have an account?',
        register: 'Create an account',
      },
      register: {
        title: 'Create an account',
        subtitle: 'Enter your details to create a new account',
        haveAccount: 'Already have an account?',
        login: 'Login',
        usernameHint: 'Use only letters, numbers, and underscores',
        passwordRequirements: 'Must contain at least 8 characters, uppercase, lowercase, number, and special character.',
      },
      verifyEmail: {
        title: 'Verify your email',
        subtitle: 'Enter the verification code sent to your email',
        code: 'Verification Code',
        verify: 'Verify Email',
        success: 'Email verified successfully',
        skipForNow: 'Skip for now',
      },
      logout: {
        title: 'Logout Confirmation',
        description: 'Are you sure you want to logout of your account?',
      },
    },
    
    dashboard: {
      welcome: 'Dashboard',
      subtitle: 'Welcome back, {{name}}',
      stats: {
        account: 'Account',
        accountDescription: 'Your username',
        emailStatus: 'Email Status',
        emailDescription: 'Verification status',
        activeSessions: 'Active Sessions',
        sessionsDescription: 'Across all devices',
        accountCreated: 'Account Created',
        createdDescription: 'Registration date',
      },
      quickActions: {
        title: 'Quick Actions',
        description: 'Things you can do with your account',
        profile: 'Update your profile information',
        sessions: 'Manage active sessions',
        security: 'Change your password',
      },
      accountOverview: {
        title: 'Account Overview',
        description: 'Your account information',
      },
    },
    
    profile: {
      title: 'Profile',
      subtitle: 'Manage your account information',
      updateSuccess: 'Profile updated successfully',
      passwordSuccess: 'Password changed successfully',
      information: {
        title: 'Personal Information',
        description: 'Update your account details',
        usernameDescription: 'This is how others will see you on the platform',
      },
      password: {
        title: 'Change Password',
        description: 'Update your password to improve security',
        current: 'Current Password',
        new: 'New Password',
        update: 'Update Password',
      },
    },
    
    sessions: {
      title: 'Sessions',
      subtitle: 'Manage your active sessions across all devices',
      activeSessions: 'Active Sessions',
      description: 'View and manage all your active sessions',
      noSessions: 'No active sessions found',
      status: 'Status',
      ipAddress: 'IP Address',
      userAgent: 'Device',
      created: 'Created',
      active: 'Active',
      inactive: 'Inactive',
      deactivate: 'Deactivate',
      deactivateAll: 'Deactivate All',
      confirmDeactivate: 'Deactivate Session',
      confirmDeactivateDescription: 'Are you sure you want to deactivate this session? You will be logged out on that device.',
      confirmDeactivateAll: 'Deactivate All Sessions',
      confirmDeactivateAllDescription: 'Are you sure you want to deactivate all sessions? You will be logged out on all devices.',
      deactivateSuccess: 'Session deactivated successfully',
      deactivateAllSuccess: 'All {{count}} sessions deactivated successfully',
    },
    
    errors: {
      notFound: {
        title: 'Page Not Found',
        message: 'The page you are looking for doesn\'t exist or has been moved.',
      },
    },
  },
};