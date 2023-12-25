-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "address_line2" TEXT,
    "city" TEXT,
    "address_line1" TEXT,
    "country" TEXT,
    "phone_number" TEXT,
    "user_id" INTEGER,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "order_number" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "total_price" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "note" TEXT,
    "payment_id" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order_item" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "Order_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "payment_method" TEXT NOT NULL,
    "amount" INTEGER,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "SKU" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product_category" (
    "id" SERIAL NOT NULL,
    "category_name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,

    CONSTRAINT "Product_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "role_type" TEXT NOT NULL DEFAULT USER,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shipping_product" (
    "id" SERIAL NOT NULL,
    "shipping_date" DATE DEFAULT CURRENT_TIMESTAMP,
    "address_line1" TEXT,
    "address_line2" TEXT,
    "city" TEXT,
    "phone_number" TEXT,
    "receipt_date" DATE,
    "order_id" INTEGER,

    CONSTRAINT "Shipping_product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Variants" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "product_id" INTEGER,

    CONSTRAINT "Variants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Variant_values" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "variants_id" INTEGER,

    CONSTRAINT "Variant_values_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "Payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Order_item" ADD CONSTRAINT "Order_item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Order_item" ADD CONSTRAINT "Order_item_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Product_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Shipping_product" ADD CONSTRAINT "Shipping_product_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Variants" ADD CONSTRAINT "Variants_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Variant_values" ADD CONSTRAINT "Variant_values_variants_id_fkey" FOREIGN KEY ("variants_id") REFERENCES "Variants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
