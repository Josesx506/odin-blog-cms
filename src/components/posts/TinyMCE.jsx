import { supabaseBucket, supabaseClient } from "@/config/supabase";
import { Editor } from '@tinymce/tinymce-react';
import { toast } from 'react-hot-toast';

export default function TinyMCE({ editorRef, editorContent, handleEditorChange,initialValue="" }) {
  return (
    <>
      <Editor
        onInit={(evt, editor) => editorRef.current = editor}
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API}
        initialValue={initialValue}
        value={editorContent}
        onEditorChange={handleEditorChange}
        init={{
          height: 500, menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'markdown'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | image | code | markdown | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          images_upload_handler: async (blobInfo, progress) => {
            try {
              // Upload to Supabase
              const file = blobInfo.blob();
              const fileName = blobInfo.filename();
              const fileExt = fileName.split(".").pop();
              const cleanName = fileName.replace(`.${fileExt}`, '');
              const filePath = `uploads/${cleanName}-${crypto.randomUUID()}.${fileExt}`;
              
              let { data, error } = await supabaseClient.storage.from(supabaseBucket).upload(filePath, file);
              if (error) { throw error };
              const { data: url } = await supabaseClient.storage.from(supabaseBucket).getPublicUrl(filePath);
              
              return Promise.resolve(url.publicUrl);
            } catch (err) {
              toast.error(err.message || "Image upload failed");
              return Promise.reject(err.message)
            }
          },
        }}
      />
    </>
  )
}
