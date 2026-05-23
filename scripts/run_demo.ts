import { payload, summary } from "../src/services/iacMarketingService";

console.log("iac-saas-marketing demo");
console.log(JSON.stringify(summary(), null, 2));
console.log(JSON.stringify(payload().artifacts, null, 2));
