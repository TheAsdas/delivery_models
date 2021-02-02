/**
 * Clase que representa el error que se pueda producir en el server
 * 
 * @author Carlos Mondaca Arancibia
 * @version 09/29/2020
 */
export class ServerError extends Error {
    /**
     * Representa el status code dl error a enviar al cliente
     */
    public statusCode: number;

    constructor(message: string, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
    }

    logError() {
        return {
            message: this.message,
            statusCode: this.statusCode,
        };
    }
}
