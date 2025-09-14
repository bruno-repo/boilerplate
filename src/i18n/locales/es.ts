export default {
  translation: {
    common: {
      login: 'Iniciar sesión',
      register: 'Registrarse',
      logout: 'Cerrar sesión',
      email: 'Correo electrónico',
      password: 'Contraseña',
      confirmPassword: 'Confirmar contraseña',
      username: 'Nombre de usuario',
      loading: 'Cargando...',
      saving: 'Guardando...',
      updating: 'Actualizando...',
      saveChanges: 'Guardar cambios',
      cancel: 'Cancelar',
      continue: 'Continuar',
      getStarted: 'Comenzar',
      learnMore: 'Más información',
      backToHome: 'Volver al inicio',
      goBack: 'Volver atrás',
      actions: 'Acciones',
      verified: 'Verificado',
      notVerified: 'No verificado',
      allRightsReserved: 'Todos los derechos reservados.',
    },
    
    validation: {
      required: 'Este campo es obligatorio',
      email: 'Introduzca un correo electrónico válido',
      minLength: 'Debe tener al menos {{length}} caracteres',
      maxLength: 'Debe tener como máximo {{length}} caracteres',
      exactLength: 'Debe tener exactamente {{length}} caracteres',
      passwordsMatch: 'Las contraseñas deben coincidir',
      alphanumeric: 'Solo se permiten letras, números y guiones bajos',
      uppercase: 'Debe contener al menos una letra mayúscula',
      lowercase: 'Debe contener al menos una letra minúscula',
      number: 'Debe contener al menos un número',
      special: 'Debe contener al menos un carácter especial (@$!%*?&)',
      numeric: 'Debe contener solo números',
    },
    
    theme: {
      toggle: 'Cambiar tema',
      light: 'Claro',
      dark: 'Oscuro',
      system: 'Sistema',
    },
    
    language: {
      toggle: 'Cambiar idioma',
      english: 'Inglés',
      spanish: 'Español',
    },
    
    home: {
      dashboard: 'Panel',
      hero: {
        title: 'Pro Boilerplate',
        subtitle: 'Un boilerplate completo de autenticación con gestión de usuarios, control de sesiones y personalización de perfiles.',
      },
      features: {
        secure: {
          title: 'Autenticación Segura',
          description: 'Seguridad de nivel empresarial con tokens JWT, cifrado de contraseñas y verificación por correo electrónico.',
        },
        tokens: {
          title: 'Gestión de Tokens',
          description: 'Renovación automática de tokens, gestión de caducidad y almacenamiento seguro.',
        },
        sessions: {
          title: 'Control de Sesiones',
          description: 'Visualiza y gestiona todas las sesiones activas en diferentes dispositivos.',
        },
      },
    },
    
    nav: {
      dashboard: 'Panel',
      profile: 'Perfil',
      sessions: 'Sesiones',
    },
    
    auth: {
      login: {
        title: 'Bienvenido de nuevo',
        subtitle: 'Introduce tus credenciales para acceder a tu cuenta',
        noAccount: '¿No tienes una cuenta?',
        register: 'Crear una cuenta',
      },
      register: {
        title: 'Crear una cuenta',
        subtitle: 'Introduce tus datos para crear una nueva cuenta',
        haveAccount: '¿Ya tienes una cuenta?',
        login: 'Iniciar sesión',
        usernameHint: 'Usa solo letras, números y guiones bajos',
        passwordRequirements: 'Debe contener al menos 8 caracteres, mayúsculas, minúsculas, números y caracteres especiales.',
      },
      verifyEmail: {
        title: 'Verifica tu correo electrónico',
        subtitle: 'Introduce el código de verificación enviado a tu correo electrónico',
        code: 'Código de verificación',
        verify: 'Verificar correo',
        success: 'Correo electrónico verificado correctamente',
        skipForNow: 'Omitir por ahora',
      },
      logout: {
        title: 'Confirmación de cierre de sesión',
        description: '¿Estás seguro de que quieres cerrar sesión en tu cuenta?',
      },
    },
    
    dashboard: {
      welcome: 'Panel',
      subtitle: 'Bienvenido de nuevo, {{name}}',
      stats: {
        account: 'Cuenta',
        accountDescription: 'Tu nombre de usuario',
        emailStatus: 'Estado del correo',
        emailDescription: 'Estado de verificación',
        activeSessions: 'Sesiones activas',
        sessionsDescription: 'En todos los dispositivos',
        accountCreated: 'Cuenta creada',
        createdDescription: 'Fecha de registro',
      },
      quickActions: {
        title: 'Acciones rápidas',
        description: 'Cosas que puedes hacer con tu cuenta',
        profile: 'Actualizar tu información de perfil',
        sessions: 'Gestionar sesiones activas',
        security: 'Cambiar tu contraseña',
      },
      accountOverview: {
        title: 'Resumen de la cuenta',
        description: 'Tu información de cuenta',
      },
    },
    
    profile: {
      title: 'Perfil',
      subtitle: 'Gestiona tu información de cuenta',
      updateSuccess: 'Perfil actualizado correctamente',
      passwordSuccess: 'Contraseña cambiada correctamente',
      information: {
        title: 'Información personal',
        description: 'Actualiza los detalles de tu cuenta',
        usernameDescription: 'Así es como otros te verán en la plataforma',
      },
      password: {
        title: 'Cambiar contraseña',
        description: 'Actualiza tu contraseña para mejorar la seguridad',
        current: 'Contraseña actual',
        new: 'Nueva contraseña',
        update: 'Actualizar contraseña',
      },
    },
    
    sessions: {
      title: 'Sesiones',
      subtitle: 'Gestiona tus sesiones activas en todos los dispositivos',
      activeSessions: 'Sesiones activas',
      description: 'Ver y gestionar todas tus sesiones activas',
      noSessions: 'No se encontraron sesiones activas',
      status: 'Estado',
      ipAddress: 'Dirección IP',
      userAgent: 'Dispositivo',
      created: 'Creada',
      active: 'Activa',
      inactive: 'Inactiva',
      deactivate: 'Desactivar',
      deactivateAll: 'Desactivar todas',
      confirmDeactivate: 'Desactivar sesión',
      confirmDeactivateDescription: '¿Estás seguro de que quieres desactivar esta sesión? Se cerrará la sesión en ese dispositivo.',
      confirmDeactivateAll: 'Desactivar todas las sesiones',
      confirmDeactivateAllDescription: '¿Estás seguro de que quieres desactivar todas las sesiones? Se cerrará la sesión en todos los dispositivos.',
      deactivateSuccess: 'Sesión desactivada correctamente',
      deactivateAllSuccess: 'Se desactivaron {{count}} sesiones correctamente',
    },
    
    errors: {
      notFound: {
        title: 'Página no encontrada',
        message: 'La página que estás buscando no existe o ha sido movida.',
      },
    },
  },
};