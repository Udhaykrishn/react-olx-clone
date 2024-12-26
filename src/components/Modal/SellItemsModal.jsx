import { Modal, ModalBody } from "flowbite-react";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import { userAuth } from "../../context/AuthContext";
import { supabase } from "../../supabase/supabase";
import { Input } from "../Input/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sellItemSchema } from "../../schema/sellItemsSchama";

export const SellItemModal = ({ toggleModal, status, setItems }) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset
    } = useForm({
      resolver: zodResolver(sellItemSchema)
    });
  
    const [submitting, setSubmitting] = useState(false);
    const auth = userAuth();
  
    const uploadImage = async (file) => {
      if (!file) return null;
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;
  
      const { error } = await supabase.storage
        .from("images")
        .upload(filePath, file);
  
      if (error) throw error;
  
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);
  
      return publicUrl;
    };
  
    const onSubmit = async (data) => {
      if (!auth?.user) {
        alert("Please log in to sell items.");
        return;
      }
  
      try {
        setSubmitting(true);
        const imageUrl = await uploadImage(data.image);
  
        await addDoc(collection(firestore, "products"), {
          title: data.title,
          category: data.category,
          price: data.price,
          description: data.description,
          imageUrl,
          userId: auth.user.uid,
          userName: auth.user.displayName || "Anonymous",
          createdAt: new Date().toISOString(),
        });
  
        reset();
        await setItems();
        toggleModal();
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to submit item");
      } finally {
        setSubmitting(false);
      }
    };
  
    return (
      <Modal show={status} size="md" popup onClose={toggleModal}>
        <ModalBody className="bg-white p-6 rounded-lg">
          <h2 className="font-bold text-lg mb-4">Sell Item</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {["title", "category", "price", "description"].map((field) => (
              <div key={field}>
                <Input
                  {...register(field)}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  type={field === "price" ? "number" : "text"}
                />
                {errors[field] && (
                  <span className="text-red-500 text-sm">{errors[field].message}</span>
                )}
              </div>
            ))}
  
            <div className="mt-4">
              <input
                type="file"
                {...register("image")}
                className="w-full p-2 border rounded"
                accept="image/*"
              />
              {errors.image && (
                <span className="text-red-500 text-sm">{errors.image.message}</span>
              )}
            </div>
  
            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-4 p-3 bg-[#002f34] text-white rounded-lg"
            >
              {submitting ? "Submitting..." : "Sell Item"}
            </button>
          </form>
        </ModalBody>
      </Modal>
    );
  };
