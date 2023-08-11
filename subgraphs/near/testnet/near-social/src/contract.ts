import { near, BigInt, log, json, JSONValue } from "@graphprotocol/graph-ts";
import { Account } from "../generated/schema";

function handleAction(
  action: near.ActionValue,
  receipt: near.ActionReceipt,
  blockHeader: near.BlockHeader,
  outcome: near.ExecutionOutcome
): void {
  if (action.kind != near.ActionKind.FUNCTION_CALL) {
    log.info("Early return: {}", ["Not a function call"]);
    return;
  }

  const accountId = receipt.signerId;
  let account = Account.load(receipt.signerId);
  if (account == null) {
    account = new Account(receipt.signerId);
    account.data = "";
  }

  const functionCall = action.toFunctionCall();
  const functionArgs = functionCall.args.toString();
  if (functionCall.methodName == "set") {
    account.data = functionArgs;
    //const parsed = json.fromString(functionArgs);
    //log.info("set {}", [functionArgs]);
    //log.info("account {}", [account.data.toString()]);
    // let data = account.data;
    // const record = parsed.toObject();
    // let data = record.get("data");
    // if (data) {
    //   data = data.toObject().get(accountId);
    //   if (data) {
    //     //log.info("record {}", [data.toString()]);
    //     account.data = data.toObject().entries[0].key;
    //   }
    // }

    account.save();
    // //account.data = { ...data, parsed };
  }
}

export function handleReceipt(
  receiptWithOutcome: near.ReceiptWithOutcome
): void {
  const actions = receiptWithOutcome.receipt.actions;
  for (let i = 0; i < actions.length; i++) {
    handleAction(
      actions[i],
      receiptWithOutcome.receipt,
      receiptWithOutcome.block.header,
      receiptWithOutcome.outcome
    );
  }
}
