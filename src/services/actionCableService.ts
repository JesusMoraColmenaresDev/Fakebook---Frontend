import { createConsumer, Consumer, Subscription } from '@rails/actioncable'

// Definimos la forma que tendrán los callbacks para tener un tipado seguro.
export interface ChatChannelCallbacks {
  received: (data: any) => void;
  connected: () => void;
  disconnected: () => void;
}

class ActionCableService {
  private consumer: Consumer | null = null;

  /**
   * Establece la conexión principal con el servidor de Action Cable.
   * Debe llamarse una sola vez cuando el usuario se autentica.
   */
  connect(): void {
    // Evita crear múltiples conexiones si ya existe una.
    if (this.consumer) {
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      console.error("Action Cable: No se encontró el token. La conexión fue abortada.");
      return;
    }

    // Asegúrate de que la URL coincida con tu servidor de Rails.
    const cableUrl = `ws://localhost:3000/cable?token=${token}`;

    this.consumer = createConsumer(cableUrl);
    console.log("Action Cable: Conectado al servidor.");
  }

  /**
   * Cierra la conexión con el servidor.
   * Debe llamarse cuando el usuario cierra sesión.
   */
  disconnect(): void {
    if (this.consumer) {
      this.consumer.disconnect();
      this.consumer = null;
      console.log("Action Cable: Desconectado del servidor.");
    }
  }

  /**
   * Crea una suscripción a un canal de chat específico.
   * param conversationId El ID de la conversación a la que suscribirse.
   * param callbacks Un objeto con las funciones a ejecutar (connected, disconnected, received).
   * returns La suscripción, que contiene métodos como `speak()` y `unsubscribe()`.
   */
  createSubscription(conversationId: string, callbacks: ChatChannelCallbacks): Subscription | undefined {
    if (!this.consumer) {
      console.error("Action Cable: No se puede crear la suscripción, el consumidor no está conectado.");
      return;
    }

    const channelIdentifier = { channel: 'ChatChannel', conversation_id: conversationId };

    return this.consumer.subscriptions.create(channelIdentifier, callbacks);
  }
}

// Exportamos una única instancia del servicio para usar en toda la aplicación.
export const actionCableService = new ActionCableService();
