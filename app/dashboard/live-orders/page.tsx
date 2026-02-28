"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Eye,
  ShieldAlert,
  MapPin,
  Smartphone,
  Clock,
  DollarSign,
  CreditCard,
  User,
  Package,
  X,
  History,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { generateOrder, type Order } from "@/lib/mock-data";
import Link from "next/link";

export default function LiveOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const addNewOrder = useCallback(() => {
    const newOrder = generateOrder();
    setOrders((prev) => [newOrder, ...prev].slice(0, 50));
  }, []);

  useEffect(() => {
    // Seed initial orders
    const initial: Order[] = [];
    for (let i = 0; i < 8; i++) {
      initial.push(generateOrder());
    }
    setOrders(initial);

    // Auto-generate every 3 seconds
    const interval = setInterval(addNewOrder, 3000);
    return () => clearInterval(interval);
  }, [addNewOrder]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Live Orders</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Real-time order feed. New orders arrive every 3 seconds.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
          </span>
          <span className="text-sm font-medium text-emerald-500">Live</span>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence initial={false}>
          {orders.map((order) => (
            <motion.div
              key={order.orderId}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              layout
              className="rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-card-foreground">
                  {order.orderId}
                </span>
                {order.isFraud && (
                  <Badge variant="destructive" className="gap-1 text-[10px]">
                    <ShieldAlert className="h-3 w-3" />
                    Fraud
                  </Badge>
                )}
              </div>

              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <User className="h-3.5 w-3.5" />
                  <span>{order.userId}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Smartphone className="h-3.5 w-3.5" />
                  <span>{order.device}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Package className="h-3.5 w-3.5" />
                  <span>{order.category}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{order.location}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{new Date(order.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-lg font-bold text-card-foreground">
                  ${order.amount.toLocaleString()}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 rounded-lg text-xs"
                  onClick={() => setSelectedOrder(order)}
                >
                  <Eye className="h-3.5 w-3.5" />
                  View Details
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Order Detail Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-card-foreground">
                  Order Details
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedOrder(null)}
                  className="rounded-lg"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-secondary/50 p-3">
                    <p className="text-[11px] text-muted-foreground">
                      Order ID
                    </p>
                    <p className="font-mono text-sm font-bold text-card-foreground">
                      {selectedOrder.orderId}
                    </p>
                  </div>
                  <div className="rounded-xl bg-secondary/50 p-3">
                    <p className="text-[11px] text-muted-foreground">
                      User ID
                    </p>
                    <p className="font-mono text-sm font-bold text-card-foreground">
                      {selectedOrder.userId}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-border p-4">
                  <h4 className="text-xs font-semibold text-muted-foreground">
                    Total Bill
                  </h4>
                  <p className="mt-1 text-3xl font-bold text-card-foreground">
                    ${selectedOrder.amount.toLocaleString()}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 rounded-xl bg-secondary/50 p-3">
                    <CreditCard className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-[11px] text-muted-foreground">
                        Payment
                      </p>
                      <p className="text-sm font-medium text-card-foreground">
                        {selectedOrder.paymentMethod}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-secondary/50 p-3">
                    <ShieldAlert
                      className={`h-4 w-4 ${
                        selectedOrder.isFraud
                          ? "text-destructive-foreground"
                          : "text-emerald-500"
                      }`}
                    />
                    <div>
                      <p className="text-[11px] text-muted-foreground">
                        Fraud Flag
                      </p>
                      <p className="text-sm font-medium text-card-foreground">
                        {selectedOrder.isFraud ? "Flagged" : "Clear"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Breakdown */}
                <div className="rounded-2xl border border-border p-4">
                  <h4 className="mb-3 text-xs font-semibold text-muted-foreground">
                    Order Breakdown
                  </h4>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-card-foreground">
                          {item.name} x{item.qty}
                        </span>
                        <span className="font-medium text-card-foreground">
                          ${(item.qty * item.price).toLocaleString()}
                        </span>
                      </div>
                    ))}
                    <div className="border-t border-border pt-2">
                      <div className="flex items-center justify-between text-sm font-bold">
                        <span className="text-card-foreground">Total</span>
                        <span className="text-primary">
                          ${selectedOrder.amount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/dashboard/user-history?userId=${selectedOrder.userId}`}
                >
                  <Button className="w-full gap-2 rounded-xl">
                    <History className="h-4 w-4" />
                    View User History
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
