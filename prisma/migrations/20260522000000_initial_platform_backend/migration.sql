CREATE TABLE "Campaign" (
    "id" SERIAL NOT NULL,
    "onChainId" INTEGER NOT NULL,
    "contractAddress" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "metadataURI" TEXT,
    "description" TEXT,
    "imageUrl" TEXT,
    "minRaise" TEXT NOT NULL,
    "maxRaise" TEXT NOT NULL,
    "tokenPrice" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "acceptedAsset" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'CREATED',
    "totalCommitted" TEXT NOT NULL DEFAULT '0',
    "finalized" BOOLEAN NOT NULL DEFAULT false,
    "successful" BOOLEAN,
    "tokenAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Commitment" (
    "id" SERIAL NOT NULL,
    "campaignId" INTEGER NOT NULL,
    "investor" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "blockNumber" INTEGER NOT NULL,
    "txHash" TEXT NOT NULL,
    "claimed" BOOLEAN NOT NULL DEFAULT false,
    "refunded" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Commitment_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "campaignId" INTEGER NOT NULL,
    "company" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Follow" (
    "id" SERIAL NOT NULL,
    "follower" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "CompanyAccount" (
    "id" SERIAL NOT NULL,
    "companyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyAccount_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "IndexerState" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "lastSyncedBlock" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "IndexerState_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Campaign_onChainId_key" ON "Campaign"("onChainId");
CREATE UNIQUE INDEX "Campaign_contractAddress_key" ON "Campaign"("contractAddress");
CREATE INDEX "Campaign_company_idx" ON "Campaign"("company");
CREATE INDEX "Campaign_status_idx" ON "Campaign"("status");
CREATE UNIQUE INDEX "Commitment_txHash_key" ON "Commitment"("txHash");
CREATE INDEX "Commitment_investor_idx" ON "Commitment"("investor");
CREATE INDEX "Commitment_campaignId_idx" ON "Commitment"("campaignId");
CREATE INDEX "Post_campaignId_idx" ON "Post"("campaignId");
CREATE INDEX "Post_company_idx" ON "Post"("company");
CREATE INDEX "Post_createdAt_idx" ON "Post"("createdAt");
CREATE INDEX "Follow_follower_idx" ON "Follow"("follower");
CREATE INDEX "Follow_company_idx" ON "Follow"("company");
CREATE UNIQUE INDEX "Follow_follower_company_key" ON "Follow"("follower", "company");
CREATE UNIQUE INDEX "CompanyAccount_companyId_key" ON "CompanyAccount"("companyId");
CREATE UNIQUE INDEX "CompanyAccount_walletAddress_key" ON "CompanyAccount"("walletAddress");
CREATE INDEX "CompanyAccount_walletAddress_idx" ON "CompanyAccount"("walletAddress");

ALTER TABLE "Commitment" ADD CONSTRAINT "Commitment_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Post" ADD CONSTRAINT "Post_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
