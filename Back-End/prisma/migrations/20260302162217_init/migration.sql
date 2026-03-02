-- CreateTable
CREATE TABLE "feedbacks" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "feedbacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pajamas" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "season" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "favorite" BOOLEAN NOT NULL,
    "onSale" BOOLEAN NOT NULL,
    "sale_percent" DOUBLE PRECISION,

    CONSTRAINT "pajamas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pajamas_size" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "stock_quantity" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "pajama_id" INTEGER NOT NULL,

    CONSTRAINT "pajamas_size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "buyer_name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "payment_method" TEXT NOT NULL,
    "installments" INTEGER NOT NULL DEFAULT 1,
    "card_number" TEXT,
    "address_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sale_pajamas" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "sale_id" INTEGER NOT NULL,
    "pajamas_id" INTEGER NOT NULL,

    CONSTRAINT "sale_pajamas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "number" TEXT NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "feedbacks_public_id_key" ON "feedbacks"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "pajamas_public_id_key" ON "pajamas"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "pajamas_size_public_id_key" ON "pajamas_size"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "sales_public_id_key" ON "sales"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "sale_pajamas_sale_id_pajamas_id_key" ON "sale_pajamas"("sale_id", "pajamas_id");

-- CreateIndex
CREATE UNIQUE INDEX "address_public_id_key" ON "address"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_public_id_key" ON "users"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "pajamas_size" ADD CONSTRAINT "pajamas_size_pajama_id_fkey" FOREIGN KEY ("pajama_id") REFERENCES "pajamas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_pajamas" ADD CONSTRAINT "sale_pajamas_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_pajamas" ADD CONSTRAINT "sale_pajamas_pajamas_id_fkey" FOREIGN KEY ("pajamas_id") REFERENCES "pajamas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
