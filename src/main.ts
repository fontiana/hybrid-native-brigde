declare global {
    interface Window {
        callbackSucesso: any;
        callbackErro: any;
    }
}

window.callbackSucesso = (mensagem: string, chave: string) => {
    var promise = promisesCallback.find(item => {
        return item.chave == chave;
    });
    promise?.promiseResolve({ mensagem, chave });
}

window.callbackErro = (mensagem: string, chave: string) => {
    var promise = promisesCallback.find(item => {
        return item.chave == chave;
    });
    promise?.promiseReject({ mensagem, chave });
}

var promisesCallback: [{ chave: string, promiseResolve: any, promiseReject: any }];

export function comunicacaoNativo(parametro: any): Promise<any> {
    let chavePromise = Math.floor(Math.random() * 99999).toString();
    parametro.chave = chavePromise;
    window['Native']['execute'](JSON.stringify(parametro));

    return new Promise((resolve, reject) => {
        if (promisesCallback) {
            promisesCallback.push({ chave: chavePromise, promiseResolve: resolve, promiseReject: reject })
        } else {
            promisesCallback = [{ chave: chavePromise, promiseResolve: resolve, promiseReject: reject }];
        }
    });
};