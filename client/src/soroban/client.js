import { SorobanRpc, TransactionBuilder, Networks, BASE_FEE, xdr } from "@stellar/soroban-client";
import { NETWORK_PASSPHRASE, RPC_URL } from "./config";

export const server = new SorobanRpc.Server(RPC_URL, { allowHttp: true });

export async function simulateAndSendTx(publicKey, contractId, method, args = []) {
  const account = await server.getAccount(publicKey);

  const tx = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(xdr.Operation.invokeHostFunction(
      new xdr.InvokeHostFunctionOp({
        function: xdr.HostFunction.hostFunctionTypeInvokeContract(),
        parameters: args,
      })
    ))
    .setTimeout(30)
    .build();

  // Ask Freighter to sign and send
  const signed = await window.freighterApi.signTransaction(tx.toXDR(), { network: NETWORK_PASSPHRASE });
  const result = await server.sendTransaction(xdr.TransactionEnvelope.fromXDR(signed, "base64"));
  return result;
}
