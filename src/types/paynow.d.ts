declare module "paynow" {
  export class Payment {
    reference: string;
    authEmail: string;
    add(title: string, amount: number): void;
    total(): number;
  }

  export interface InitResponse {
    success: boolean;
    status: string;
    hasRedirect: boolean;
    redirectUrl?: string;
    pollUrl?: string;
    instructions?: string;
    error?: string;
  }

  export interface StatusResponse {
    reference?: string;
    amount?: string;
    paynowReference?: string;
    pollUrl?: string;
    status?: string;
    error?: string;
  }

  export class Paynow {
    constructor(integrationId?: string, integrationKey?: string, resultUrl?: string, returnUrl?: string);
    resultUrl: string;
    returnUrl: string;
    createPayment(reference: string, authEmail?: string): Payment;
    send(payment: Payment): Promise<InitResponse>;
    sendMobile(payment: Payment, phone: string, method: string): Promise<InitResponse>;
    pollTransaction(url: string): Promise<StatusResponse>;
  }
}
