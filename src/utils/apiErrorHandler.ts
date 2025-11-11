const isNetworkError = (error: unknown): boolean => {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    return (
      message.includes('network request failed') ||
      message.includes('failed to fetch') ||
      message.includes('networkerror') ||
      message.includes('timeout')
    );
  }
  return false;
};

export const handleWithErrorOfApi = (error: unknown, context?: string): Error => {
  let errorMessage = 'Erro desconhecido';
  let status: number | undefined;

  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else if (error && typeof error === 'object' && 'message' in error) {
    errorMessage = String(error.message);
    if ('status' in error) {
      status = error.status as number;
    }
  }

  const isNetwork = isNetworkError(error);

  let userFriendlyMessage = errorMessage;
  if (isNetwork) {
    if (
      context?.includes('create') ||
      context?.includes('addComment') ||
      context?.includes('uploadAttachment')
    ) {
      userFriendlyMessage =
        'Erro de conexão. Não foi possível realizar a operação. Verifique sua internet e tente novamente.';
    } else if (context?.includes('list') || context?.includes('getById')) {
      userFriendlyMessage = 'Erro de conexão. Verificando dados salvos...';
    } else {
      userFriendlyMessage = 'Erro de conexão. Verifique sua internet e tente novamente.';
    }
  }

  const contextMessage = context ? `[${context}] ` : '';
  const fullMessage = `${contextMessage}${errorMessage}`;

  if (isNetwork) {
    console.warn('Network Error (using cache if available):', {
      context,
      originalError: errorMessage,
    });
  } else {
    console.error('API Error:', {
      message: fullMessage,
      status,
      originalError: error,
    });
  }

  const errorToThrow = new Error(userFriendlyMessage);
  if (status) {
    (errorToThrow as any).status = status;
  }
  (errorToThrow as any).isNetworkError = isNetwork;

  return errorToThrow;
};
