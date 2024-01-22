import { toJpeg, toPng } from 'html-to-image';
import "./App.css";
import { useState, ChangeEvent,useRef } from "react";

import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import {
Center,
Image
} from "@chakra-ui/react";

import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-dnd";


interface IImage {
  id: number;
  data: string;
}

export default function App() {
  const [uploadedImages, setUploadedImages] = useState<IImage[]>([]);
  const [title, setTitle] = useState("");
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImages(prevImages => [
          ...prevImages,
          { id: prevImages.length, data: reader.result as string },
        ]);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleOnChange = (
    sourceId: string,
    sourceIndex: number,
    targetIndex: number
  ) => {
    const nextState = swap(uploadedImages, sourceIndex, targetIndex);
    setUploadedImages(nextState);
  };
  const boxRef = useRef<HTMLElement | null>(null);

  const handleDownloadClick = () => {
    if (boxRef.current) {
      toJpeg(boxRef.current, { backgroundColor: 'white' })
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = 'my-image-name.jpeg';
          link.href = dataUrl;
          link.click();
        })
    }
  };
  const deleteImage = (id: number) => {
    setUploadedImages(prevImages => prevImages.filter(image => image.id !== id));
  }; 
  return (
    
    <Box className="App" justifyContent="center">
              <Center mt={0}>
        <Image src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuZGV2L3N2Z2pzIiB3aWR0aD0iMTUwMCIgaGVpZ2h0PSIxNTAwIiB2aWV3Qm94PSIwIDAgMTUwMCAxNTAwIj48cmVjdCB3aWR0aD0iMTUwMCIgaGVpZ2h0PSIxNTAwIiBmaWxsPSIjZmZmZmZmIj48L3JlY3Q+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMC42NjY2NjY2NjY2NjY2NjY2LDAsMCwwLjY2NjY2NjY2NjY2NjY2NjYsMjQ5LjM5MzkzOTM5MzkzOTM4LDQzOC41ODU2OTUwMDY3NDc3KSI+PHN2ZyB2aWV3Qm94PSIwIDAgMzk2IDI0NyIgZGF0YS1iYWNrZ3JvdW5kLWNvbG9yPSIjZmZmZmZmIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0IiBoZWlnaHQ9IjkzNSIgd2lkdGg9IjE1MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxnIGlkPSJ0aWdodC1ib3VuZHMiIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMC4yNDAwMDAwMDAwMDAwMDkxLC0wLjA5OTk5OTk5OTk5OTk5NDMyKSI+PHN2ZyB2aWV3Qm94PSIwIDAgMzk1LjUyIDI0Ny4yIiBoZWlnaHQ9IjI0Ny4yIiB3aWR0aD0iMzk1LjUyIj48Zz48c3ZnPjwvc3ZnPjwvZz48Zz48c3ZnIHZpZXdCb3g9IjAgMCAzOTUuNTIgMjQ3LjIiIGhlaWdodD0iMjQ3LjIiIHdpZHRoPSIzOTUuNTIiPjxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsOTguNDEyODk4MTU5NTA5Miw0Ny4yMTUxOTk5OTk5OTk5OTYpIj48c3ZnIHZpZXdCb3g9IjAgMCAxOTguNjk0MjAzNjgwOTgxNiAxNTIuNzY5NiIgaGVpZ2h0PSIxNTIuNzY5NiIgd2lkdGg9IjE5OC42OTQyMDM2ODA5ODE2Ij48Zz48c3ZnIHZpZXdCb3g9IjAgMCAxOTguNjk0MjAzNjgwOTgxNiAxNTIuNzY5NiIgaGVpZ2h0PSIxNTIuNzY5NiIgd2lkdGg9IjE5OC42OTQyMDM2ODA5ODE2Ij48Zz48c3ZnIHZpZXdCb3g9IjAgMCAxOTguNjk0MjAzNjgwOTgxNiAxNTIuNzY5NiIgaGVpZ2h0PSIxNTIuNzY5NiIgd2lkdGg9IjE5OC42OTQyMDM2ODA5ODE2Ij48ZyBpZD0idGV4dGJsb2NrdHJhbnNmb3JtIj48c3ZnIHZpZXdCb3g9IjAgMCAxOTguNjk0MjAzNjgwOTgxNiAxNTIuNzY5NiIgaGVpZ2h0PSIxNTIuNzY5NiIgd2lkdGg9IjE5OC42OTQyMDM2ODA5ODE2IiBpZD0idGV4dGJsb2NrIj48Zz48c3ZnIHZpZXdCb3g9IjAgMCAxOTguNjk0MjAzNjgwOTgxNiAxNTIuNzY5NiIgaGVpZ2h0PSIxNTIuNzY5NiIgd2lkdGg9IjE5OC42OTQyMDM2ODA5ODE2Ij48ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLDAsMCwxLDAsMCkiPjxzdmcgd2lkdGg9IjE5OC42OTQyMDM2ODA5ODE2IiB2aWV3Qm94PSIxLjc1MDAwMDAwMDAwMDAwNCAtMjUuMjUwMDAwMDAwMDAwMDA0IDEwNS45OTk5OTk5OTk5OTk5OSA2Ni4zMDAwMDAwMDAwMDAwMSIgaGVpZ2h0PSIxNTIuNzY5NiIgZGF0YS1wYWxldHRlLWNvbG9yPSIjMDA4MGZmIj48c3ZnPjwvc3ZnPjxzdmc+PC9zdmc+PGcgY2xhc3M9IndvcmRtYXJrLXRleHQtMCIgZGF0YS1maWxsLXBhbGV0dGUtY29sb3I9InByaW1hcnkiIGlkPSJ0ZXh0LTAiPjxwYXRoIGQ9Ik0yLjMtMjVoNXYzLjQ1YzAuODY3LTEuNiAxLjc4My0yLjYxNyAyLjc1LTMuMDUgMC45NjctMC40MzMgMS44ODMtMC42NSAyLjc1LTAuNjV2MGMwLjg2NyAwIDEuNjI3IDAuMTE3IDIuMjggMC4zNSAwLjY0NyAwLjIzMyAxLjIwMyAwLjU1IDEuNjcgMC45NSAwLjQ2NyAwLjQgMC44NiAwLjg2NyAxLjE4IDEuNCAwLjMxMyAwLjUzMyAwLjU3IDEuMTE3IDAuNzcgMS43NXYwYzAuNDY3LTEgMC45NS0xLjc5MyAxLjQ1LTIuMzggMC41LTAuNTggMS0xLjAzIDEuNS0xLjM1IDAuNS0wLjMxMyAwLjk5My0wLjUxMyAxLjQ4LTAuNiAwLjQ4LTAuMDggMC45Mi0wLjEyIDEuMzItMC4xMnYwYzEuNSAwIDIuNzEgMC4yODMgMy42MyAwLjg1IDAuOTEzIDAuNTY3IDEuNjAzIDEuMjkgMi4wNyAyLjE3IDAuNDY3IDAuODg3IDAuNzc3IDEuODUzIDAuOTMgMi45IDAuMTQ3IDEuMDUzIDAuMjIgMi4wNjMgMC4yMiAzLjAzdjBjMCAwLjYtMC4wMTcgMS4yNTctMC4wNSAxLjk3LTAuMDMzIDAuNzItMC4wNjcgMS40NTMtMC4xIDIuMi0wLjAzMyAwLjc1My0wLjA2NyAxLjUwMy0wLjEgMi4yNS0wLjAzMyAwLjc1My0wLjA1IDEuNDQ3LTAuMDUgMi4wOHYwYzAgMC4yNjcgMC4wMTcgMC42NCAwLjA1IDEuMTIgMC4wMzMgMC40ODcgMC4xMTcgMC45NjMgMC4yNSAxLjQzIDAuMTMzIDAuNDY3IDAuMzUgMC44NzMgMC42NSAxLjIyIDAuMyAwLjM1MyAwLjczMyAwLjUzIDEuMyAwLjUzdjBjMC43NjcgMCAxLjQ2LTAuNDMzIDIuMDgtMS4zIDAuNjEzLTAuODY3IDEuMTItMi4yNSAxLjUyLTQuMTV2MGgxLjg1Yy0wLjM2NyAyLjEtMC44MzMgMy43NTctMS40IDQuOTctMC41NjcgMS4yMi0xLjE2NyAyLjE0Ny0xLjggMi43OC0wLjYzMyAwLjYzMy0xLjI2NyAxLjA0My0xLjkgMS4yMy0wLjYzMyAwLjE4LTEuMjE3IDAuMjctMS43NSAwLjI3djBjLTEuMDY3IDAtMS45NjctMC4yMS0yLjctMC42My0wLjczMy0wLjQxMy0xLjMzMy0wLjk3LTEuOC0xLjY3LTAuNDY3LTAuNy0wLjgwNy0xLjUxNy0xLjAyLTIuNDUtMC4yMi0wLjkzMy0wLjMzLTEuOS0wLjMzLTIuOXYwYzAtMC4zIDAuMDEtMC44NiAwLjAzLTEuNjggMC4wMTMtMC44MTMgMC4wMy0xLjY4NyAwLjA1LTIuNjIgMC4wMTMtMC45MzMgMC4wMy0xLjgxNyAwLjA1LTIuNjUgMC4wMTMtMC44MzMgMC4wMi0xLjQxNyAwLjAyLTEuNzV2MGMwLTEuMDY3LTAuMDgzLTEuOTUtMC4yNS0yLjY1LTAuMTY3LTAuNy0wLjQtMS4yNS0wLjctMS42NS0wLjMtMC40LTAuNjQtMC42ODMtMS4wMi0wLjg1LTAuMzg3LTAuMTY3LTAuNzk3LTAuMjUtMS4yMy0wLjI1djBjLTEuMDMzIDAtMS44NzMgMC40MTctMi41MiAxLjI1LTAuNjUzIDAuODMzLTEuMTEzIDIuMjMzLTEuMzggNC4ydjAgMTZoLTV2LTE2LjdjMC0wLjYtMC4wMjMtMS4xODMtMC4wNy0xLjc1LTAuMDUzLTAuNTY3LTAuMTgtMS4wNzctMC4zOC0xLjUzLTAuMi0wLjQ0Ny0wLjQ4My0wLjgwMy0wLjg1LTEuMDctMC4zNjctMC4yNjctMC44NjctMC40LTEuNS0wLjR2MGMtMS4wNjcgMC0xLjg3MyAwLjQ0LTIuNDIgMS4zMi0wLjU1MyAwLjg4Ny0xLjA2MyAyLjI2My0xLjUzIDQuMTN2MCAxNmgtNXpNNDguODUtMjVoNXYyMy45NWMwLjgzMy0wLjI2NyAxLjU3Ny0wLjU2NyAyLjIzLTAuOSAwLjY0Ny0wLjMzMyAxLjIxLTAuNzgzIDEuNjktMS4zNSAwLjQ4Ny0wLjU2NyAwLjg5LTEuMyAxLjIxLTIuMiAwLjMxMy0wLjkgMC41NTMtMi4wNSAwLjcyLTMuNDV2MGgxLjg1Yy0wLjI2NyAxLjc2Ny0wLjYxIDMuMjA3LTEuMDMgNC4zMi0wLjQxMyAxLjEyLTAuOTI3IDIuMDItMS41NCAyLjctMC42MiAwLjY4Ny0xLjM1NyAxLjIyLTIuMjEgMS42LTAuODQ3IDAuMzg3LTEuODIgMC43NDctMi45MiAxLjA4djAgMy4yYzAgMS41NjctMC4xNjcgMi44OTMtMC41IDMuOTgtMC4zMzMgMS4wOC0wLjc5MyAxLjk2My0xLjM4IDIuNjUtMC41OCAwLjY4LTEuMjQzIDEuMTctMS45OSAxLjQ3LTAuNzUzIDAuMy0xLjU0NyAwLjQ1LTIuMzggMC40NXYwYy0xLjY2NyAwLTIuOTY3LTAuNDczLTMuOS0xLjQyLTAuOTMzLTAuOTUzLTEuNC0yLjExMy0xLjQtMy40OHYwYzAtMC44NjcgMC4xOTMtMS42NSAwLjU4LTIuMzUgMC4zOC0wLjcgMC44OC0xLjM0IDEuNS0xLjkyIDAuNjEzLTAuNTg3IDEuMzEzLTEuMTAzIDIuMS0xLjU1IDAuNzgtMC40NTMgMS41Ny0wLjg0NyAyLjM3LTEuMTh2MC0zLjE1Yy0wLjY2NyAwLjk2Ny0xLjQyMyAxLjY4My0yLjI3IDIuMTUtMC44NTMgMC40NjctMS43MTMgMC43LTIuNTggMC43djBjLTAuOTY3IDAtMS44ODMtMC4xMzMtMi43NS0wLjQtMC44NjctMC4yNjctMS42MTctMC43MS0yLjI1LTEuMzMtMC42MzMtMC42MTMtMS4xMzMtMS40MTMtMS41LTIuNC0wLjM2Ny0wLjk4LTAuNTUtMi4xODctMC41NS0zLjYydjAtMTcuNTVoNXYxN2MwIDEuNjMzIDAuMjgzIDIuNzkgMC44NSAzLjQ3IDAuNTY3IDAuNjg3IDEuMjgzIDEuMDMgMi4xNSAxLjAzdjBjMC40NjcgMCAwLjkzMy0wLjExNyAxLjQtMC4zNSAwLjQ2Ny0wLjIzMyAwLjg4My0wLjU3NyAxLjI1LTEuMDMgMC4zNjctMC40NDcgMC42NjctMC45ODcgMC45LTEuNjIgMC4yMzMtMC42MzMgMC4zNS0xLjM2NyAwLjM1LTIuMnYwek00Ni42NSA5Ljl2MGMwLjkgMCAxLjQ5LTAuMzQgMS43Ny0xLjAyIDAuMjg3LTAuNjg3IDAuNDMtMS42MTMgMC40My0yLjc4djAtMy41Yy0xLjY2NyAwLjc2Ny0yLjg1IDEuNTI3LTMuNTUgMi4yOC0wLjcgMC43NDctMS4wNSAxLjU4Ny0xLjA1IDIuNTJ2MGMwIDAuNzY3IDAuMjEgMS4zNzMgMC42MyAxLjgyIDAuNDEzIDAuNDUzIDEuMDAzIDAuNjggMS43NyAwLjY4eiIgZmlsbD0iIzAwMDAwMCIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCIgZGF0YS1maWxsLXBhbGV0dGUtY29sb3I9InByaW1hcnkiIG9wYWNpdHk9IjEiPjwvcGF0aD48cGF0aCBkPSJNMTMuNjUgMjMuNHYwYzAuMjY3LTAuMjMzIDAuNDc3LTAuNjEgMC42My0xLjEzIDAuMTQ3LTAuNTEzIDAuMjItMS4wMDMgMC4yMi0xLjQ3djBjMC0wLjc2Ny0wLjI0LTEuNC0wLjcyLTEuOS0wLjQ4Ny0wLjUtMS4xNjMtMC43NS0yLjAzLTAuNzV2MGMtMC45IDAtMS42NSAwLjMzMy0yLjI1IDEtMC42IDAuNjY3LTEuMDgzIDEuNTEtMS40NSAyLjUzLTAuMzY3IDEuMDEzLTAuNjIzIDIuMTQzLTAuNzcgMy4zOS0wLjE1MyAxLjI1My0wLjIzIDIuNDgtMC4yMyAzLjY4djBjMCAxLjc2NyAwLjE2IDMuMiAwLjQ4IDQuMyAwLjMxMyAxLjEgMC43MzcgMS45NTcgMS4yNyAyLjU3IDAuNTMzIDAuNjIgMS4xNiAxLjA0NyAxLjg4IDEuMjggMC43MTMgMC4yMzMgMS40NyAwLjM1IDIuMjcgMC4zNXYwYzEuNzY3IDAgMy4yNi0wLjQ0MyA0LjQ4LTEuMzMgMS4yMTMtMC44OCAyLjI1My0yLjI1MyAzLjEyLTQuMTJ2MGgxLjdjLTAuNCAxLjIzMy0wLjk2NyAyLjQwNy0xLjcgMy41Mi0wLjczMyAxLjEyLTEuNTgzIDIuMTAzLTIuNTUgMi45NS0wLjk2NyAwLjg1My0yLjAxNyAxLjUzLTMuMTUgMi4wMy0xLjEzMyAwLjUtMi4zMTcgMC43NS0zLjU1IDAuNzV2MGMtMS4xNjcgMC0yLjMxNy0wLjItMy40NS0wLjYtMS4xMzMtMC40LTIuMTUtMS4wNTctMy4wNS0xLjk3LTAuOS0wLjkyLTEuNjMzLTIuMTIzLTIuMi0zLjYxLTAuNTY3LTEuNDgtMC44NS0zLjMwMy0wLjg1LTUuNDd2MGMwLTEuNCAwLjEyNy0yLjkxIDAuMzgtNC41MyAwLjI0Ny0xLjYxMyAwLjcxMy0zLjExMyAxLjQtNC41IDAuNjgtMS4zOCAxLjYyLTIuNTM3IDIuODItMy40NyAxLjItMC45MzMgMi43NS0xLjQgNC42NS0xLjR2MGMyLjEgMCAzLjcgMC41MDcgNC44IDEuNTIgMS4xIDEuMDIgMS42NSAyLjUxMyAxLjY1IDQuNDh2MGMwIDAuODMzLTAuMTU3IDEuNTMzLTAuNDcgMi4xLTAuMzIgMC41NjctMC44MTMgMC44NS0xLjQ4IDAuODV2MGMtMC43MzMgMC0xLjM1LTAuMzUtMS44NS0xLjA1ek0yMC41IDYuNDVsNS0wLjd2MTMuOGMwLjUtMC45IDEuMDA3LTEuNjI3IDEuNTItMi4xOCAwLjUyLTAuNTQ3IDEuMDQ3LTAuOTUzIDEuNTgtMS4yMiAwLjUzMy0wLjI2NyAxLjA0My0wLjQ0MyAxLjUzLTAuNTMgMC40OC0wLjA4IDAuOTM3LTAuMTIgMS4zNy0wLjEydjBjMS41IDAgMi43MSAwLjI4MyAzLjYzIDAuODUgMC45MTMgMC41NjcgMS42MDMgMS4yOSAyLjA3IDIuMTcgMC40NjcgMC44ODcgMC43NzcgMS44NTMgMC45MyAyLjkgMC4xNDcgMS4wNTMgMC4yMiAyLjA2MyAwLjIyIDMuMDN2MGMwIDAuNi0wLjAxNyAxLjI1Ny0wLjA1IDEuOTctMC4wMzMgMC43Mi0wLjA2NyAxLjQ1My0wLjEgMi4yLTAuMDMzIDAuNzUzLTAuMDY3IDEuNTAzLTAuMSAyLjI1LTAuMDMzIDAuNzUzLTAuMDUgMS40NDctMC4wNSAyLjA4djBjMCAwLjI2NyAwLjAxNyAwLjY0IDAuMDUgMS4xMiAwLjAzMyAwLjQ4NyAwLjExNyAwLjk2MyAwLjI1IDEuNDMgMC4xMzMgMC40NjcgMC4zNSAwLjg3MyAwLjY1IDEuMjIgMC4zIDAuMzUzIDAuNzMzIDAuNTMgMS4zIDAuNTN2MGMwLjc2NyAwIDEuNDYtMC40MzMgMi4wOC0xLjMgMC42MTMtMC44NjcgMS4xMi0yLjI1IDEuNTItNC4xNXYwaDEuODVjLTAuMzY3IDIuMS0wLjgzMyAzLjc1Ny0xLjQgNC45Ny0wLjU2NyAxLjIyLTEuMTY3IDIuMTQ3LTEuOCAyLjc4LTAuNjMzIDAuNjMzLTEuMjY3IDEuMDQzLTEuOSAxLjIzLTAuNjMzIDAuMTgtMS4yMTcgMC4yNy0xLjc1IDAuMjd2MGMtMS4wNjcgMC0xLjk2Ny0wLjIxLTIuNy0wLjYzLTAuNzMzLTAuNDEzLTEuMzMzLTAuOTctMS44LTEuNjctMC40NjctMC43LTAuODA3LTEuNTE3LTEuMDItMi40NS0wLjIyLTAuOTMzLTAuMzMtMS45LTAuMzMtMi45djBjMC0wLjMgMC4wMS0wLjg2IDAuMDMtMS42OCAwLjAxMy0wLjgxMyAwLjAzLTEuNjg3IDAuMDUtMi42MiAwLjAxMy0wLjkzMyAwLjAyNy0xLjgxNyAwLjA0LTIuNjUgMC4wMi0wLjgzMyAwLjAzLTEuNDE3IDAuMDMtMS43NXYwYzAtMS4wNjctMC4wODMtMS45NS0wLjI1LTIuNjUtMC4xNjctMC43LTAuNC0xLjI1LTAuNy0xLjY1LTAuMy0wLjQtMC42NC0wLjY4My0xLjAyLTAuODUtMC4zODctMC4xNjctMC43OTctMC4yNS0xLjIzLTAuMjV2MGMtMS4wMzMgMC0xLjkyNyAwLjQxNy0yLjY4IDEuMjUtMC43NDcgMC44MzMtMS4zNTMgMi4yMzMtMS44MiA0LjJ2MCAxNmgtNXpNNTMgMTUuNXYwYzEuMyAwIDIuNDE3IDAuMiAzLjM1IDAuNiAwLjkzMyAwLjQgMS43IDAuOTU3IDIuMyAxLjY3IDAuNiAwLjcyIDEuMDc3IDEuNTYzIDEuNDMgMi41MyAwLjM0NyAwLjk2NyAwLjYwMyAyIDAuNzcgMy4xdjBoMC4zYzEuNCAwIDIuNjgzLTAuMjgzIDMuODUtMC44NSAxLjE2Ny0wLjU2NyAyLjE2Ny0xLjI4MyAzLTIuMTV2MGwwLjc1IDEuMzVjLTAuNjY3IDEuMDY3LTEuNzIzIDEuOTUtMy4xNyAyLjY1LTEuNDUzIDAuNy0yLjk0NyAxLjE4My00LjQ4IDEuNDV2MGMwIDAuMzMzIDAuMDEgMC42NjcgMC4wMyAxIDAuMDEzIDAuMzMzIDAuMDIgMC42ODMgMC4wMiAxLjA1djBjMCA0LjEtMC43NSA3LjMxNy0yLjI1IDkuNjUtMS41IDIuMzMzLTMuNiAzLjUtNi4zIDMuNXYwYy0xLjEgMC0yLjIxLTAuMi0zLjMzLTAuNi0xLjExMy0wLjQtMi4xMi0xLjA2Ny0zLjAyLTItMC45LTAuOTMzLTEuNjI3LTIuMTMzLTIuMTgtMy42LTAuNTQ3LTEuNDY3LTAuODItMy4yODMtMC44Mi01LjQ1djBjMC0xLjQ2NyAwLjE1Ny0zLjAxNyAwLjQ3LTQuNjUgMC4zMi0xLjYzMyAwLjg1My0zLjEzMyAxLjYtNC41IDAuNzUzLTEuMzY3IDEuNzUzLTIuNSAzLTMuNCAxLjI1My0wLjkgMi44MTMtMS4zNSA0LjY4LTEuMzV6TTUzLjUgMzcuMjV2MGMxLjc2NyAwIDMuMDY3LTAuODc3IDMuOS0yLjYzIDAuODMzLTEuNzQ3IDEuMjUtNC4yMiAxLjI1LTcuNDJ2MGMwLTAuMiAwLTAuNCAwLTAuNiAwLTAuMi0wLjAxNy0wLjQtMC4wNS0wLjZ2MGMtMC45NjctMC4wNjctMS42Ni0wLjI4My0yLjA4LTAuNjUtMC40MTMtMC4zNjctMC42Mi0wLjk4My0wLjYyLTEuODV2MGMwLTAuNzY3IDAuMTY3LTEuMzEgMC41LTEuNjMgMC4zMzMtMC4zMTMgMC44MzMtMC40ODcgMS41LTAuNTJ2MGMtMC40LTEuMTY3LTAuOTA3LTEuOTc3LTEuNTItMi40My0wLjYyLTAuNDQ3LTEuMzEzLTAuNjctMi4wOC0wLjY3djBjLTEuMDMzIDAtMS45MSAwLjM0LTIuNjMgMS4wMi0wLjcxMyAwLjY4Ny0xLjI5NyAxLjU2My0xLjc1IDIuNjMtMC40NDcgMS4wNjctMC43NyAyLjI0LTAuOTcgMy41Mi0wLjIgMS4yODctMC4zIDIuNTQ3LTAuMyAzLjc4djBjMCAxLjYzMyAwLjE1IDIuOTY3IDAuNDUgNCAwLjMgMS4wMzMgMC42ODMgMS44NSAxLjE1IDIuNDUgMC40NjcgMC42IDAuOTgzIDEuMDE3IDEuNTUgMS4yNSAwLjU2NyAwLjIzMyAxLjEzMyAwLjM1IDEuNyAwLjM1ek02NC44IDE1Ljc1aDV2NC4yYzAuNC0wLjYgMC43OS0xLjE2NyAxLjE3LTEuNyAwLjM4Ny0wLjUzMyAwLjgxMy0xIDEuMjgtMS40IDAuNDY3LTAuNCAwLjk4My0wLjcyNyAxLjU1LTAuOTggMC41NjctMC4yNDcgMS4yLTAuMzcgMS45LTAuMzd2MGMxLjEzMyAwIDEuOTY3IDAuMjkgMi41IDAuODcgMC41MzMgMC41ODcgMC44IDEuMjk3IDAuOCAyLjEzdjBjMCAwLjUtMC4wODMgMC45MTctMC4yNSAxLjI1LTAuMTY3IDAuMzMzLTAuMzY3IDAuNi0wLjYgMC44LTAuMjMzIDAuMi0wLjQ4MyAwLjM0LTAuNzUgMC40Mi0wLjI2NyAwLjA4Ny0wLjUgMC4xMy0wLjcgMC4xM3YwYy0wLjMgMC0wLjU0My0wLjA2Ny0wLjczLTAuMi0wLjE4LTAuMTMzLTAuMzYzLTAuMjc3LTAuNTUtMC40My0wLjE4LTAuMTQ3LTAuMzg3LTAuMjg3LTAuNjItMC40Mi0wLjIzMy0wLjEzMy0wLjUzMy0wLjItMC45LTAuMnYwYy0wLjc2NyAwLTEuNSAwLjI2Ny0yLjIgMC44LTAuNyAwLjUzMy0xLjMzMyAxLjEtMS45IDEuN3YwIDE4LjRoLTV6TTk1LjA1IDYuNDVsNS0wLjd2MjdjMCAwLjMzMyAwLjAxNyAwLjc1IDAuMDUgMS4yNSAwLjAzMyAwLjUgMC4xMjcgMC45OSAwLjI4IDEuNDcgMC4xNDcgMC40ODcgMC4zNyAwLjkwMyAwLjY3IDEuMjUgMC4zIDAuMzUzIDAuNzE3IDAuNTMgMS4yNSAwLjUzdjBjMS42MzMgMCAyLjgzMy0xLjgxNyAzLjYtNS40NXYwaDEuODVjLTAuMzY3IDIuMS0wLjgzMyAzLjc1Ny0xLjQgNC45Ny0wLjU2NyAxLjIyLTEuMTY3IDIuMTQ3LTEuOCAyLjc4LTAuNjMzIDAuNjMzLTEuMjgzIDEuMDQzLTEuOTUgMS4yMy0wLjY2NyAwLjE4LTEuMjY3IDAuMjctMS44IDAuMjd2MGMtMC43NjcgMC0xLjQyMy0wLjEzMy0xLjk3LTAuNC0wLjU1My0wLjI2Ny0xLjAyMy0wLjYxNy0xLjQxLTEuMDUtMC4zOC0wLjQzMy0wLjY4Ny0wLjkzMy0wLjkyLTEuNS0wLjIzMy0wLjU2Ny0wLjQxNy0xLjE2Ny0wLjU1LTEuOHYwYy0wLjUgMS4zLTEuMzA3IDIuNDE3LTIuNDIgMy4zNS0xLjEyIDAuOTMzLTIuNDggMS40LTQuMDggMS40djBjLTEgMC0yLjAxLTAuMi0zLjAzLTAuNi0xLjAxMy0wLjQtMS45My0xLjA1Ny0yLjc1LTEuOTctMC44MTMtMC45Mi0xLjQ4LTIuMTA3LTItMy41Ni0wLjUxMy0xLjQ0Ny0wLjc3LTMuMjItMC43Ny01LjMydjBjMC0xLjUzMyAwLjE3My0zLjEzMyAwLjUyLTQuOCAwLjM1My0xLjY2NyAwLjkxMy0zLjE4MyAxLjY4LTQuNTUgMC43NjctMS4zNjcgMS43NS0yLjUgMi45NS0zLjQgMS4yLTAuOSAyLjY1LTEuMzUgNC4zNS0xLjM1djBjMC40IDAgMC44MjMgMC4wNCAxLjI3IDAuMTIgMC40NTMgMC4wODcgMC44ODcgMC4yMyAxLjMgMC40MyAwLjQyIDAuMiAwLjgxMyAwLjQ3MyAxLjE4IDAuODIgMC4zNjcgMC4zNTMgMC42NjcgMC43OCAwLjkgMS4yOHYwek05MC43IDM3LjI1djBjMC41IDAgMS4wMDctMC4xNDMgMS41Mi0wLjQzIDAuNTItMC4yOCAwLjk5LTAuNjYzIDEuNDEtMS4xNSAwLjQxMy0wLjQ4IDAuNzUzLTEuMDUzIDEuMDItMS43MiAwLjI2Ny0wLjY2NyAwLjQtMS4zODMgMC40LTIuMTV2MC0xMS40Yy0wLjIzMy0wLjUzMy0wLjU5My0xLjAyNy0xLjA4LTEuNDgtMC40OC0wLjQ0Ny0xLjEwMy0wLjY3LTEuODctMC42N3YwYy0xLjA2NyAwLTEuOTgzIDAuMzU3LTIuNzUgMS4wNy0wLjc2NyAwLjcyLTEuMzgzIDEuNjItMS44NSAyLjctMC40NjcgMS4wODctMC44MSAyLjI3LTEuMDMgMy41NS0wLjIxMyAxLjI4Ny0wLjMyIDIuNTEzLTAuMzIgMy42OHYwYzAgMi44NjcgMC4zOTMgNC45MTcgMS4xOCA2LjE1IDAuNzggMS4yMzMgMS45MDMgMS44NSAzLjM3IDEuODV6IiBmaWxsPSIjMDAwMDAwIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIiBkYXRhLWZpbGwtcGFsZXR0ZS1jb2xvcj0iYWNjZW50IiBvcGFjaXR5PSIxIj48L3BhdGg+PC9nPjwvc3ZnPjwvZz48L3N2Zz48L2c+PC9zdmc+PC9nPjwvc3ZnPjwvZz48L3N2Zz48L2c+PC9zdmc+PC9nPjxwYXRoIGQ9Ik0yNzMuMzE5IDQxLjIxNUwyNzMuMzE5IDAgMjYuMTE5IDAgMjYuMTE5IDI0Ny4yIDI3My4zMTkgMjQ3LjIgMjczLjMxOSAyMDUuOTg1IDI2Ni45MzcgMjA1Ljk4NSAyNjYuOTM3IDI0MC44MTkgMzIuNSAyNDAuODE5IDMyLjUgNi4zODEgMjY2LjkzNyA2LjM4MSAyNjYuOTM3IDQxLjIxNVoiIGZpbGw9IiMwMDAwMDAiIHN0cm9rZT0idHJhbnNwYXJlbnQiIGRhdGEtZmlsbC1wYWxldHRlLWNvbG9yPSJ0ZXJ0aWFyeSI+PC9wYXRoPjwvc3ZnPjwvZz48ZGVmcz48L2RlZnM+PC9zdmc+PHJlY3Qgd2lkdGg9IjM5NS41MiIgaGVpZ2h0PSIyNDcuMiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJub25lIiB2aXNpYmlsaXR5PSJoaWRkZW4iPjwvcmVjdD48L2c+PC9zdmc+PC9nPjwvc3ZnPg==" alt="Logo" boxSize="200px" />
        </Center>
      <input  type="text" value={title} onChange={handleTitleChange} placeholder="Enter a title" />
      <div></div>
      <label htmlFor="file">Add your chord here:</label>
      <input type="file" onChange={handleImageUpload} placeholder='' />
      <Box id = "chords" ref={boxRef}  sx={{
          
          border: '1px solid black',
          borderRadius: 1,
          marginTop : 10,
          marginBottom : 20,
          height: 500 * Math.ceil(uploadedImages.length / 4)
          
         
        }}>
          <h1>{title}</h1>
      <GridContextProvider onChange={handleOnChange}>
        <GridDropZone
          id="items"
          boxesPerRow={4}
          rowHeight={400}
          style={{ height: 1000 * Math.ceil(uploadedImages.length / 4) }}
        >
          {uploadedImages.map((image: IImage) => (
            <GridItem key={image.id}>
              <Card
  sx={{ marginRight: 2, marginBottom: 2, cursor: "-webkit-grab" }}
  onContextMenu={(e) => {
    e.preventDefault(); // Prevent the default right click menu from showing up
    const confirmDelete = window.confirm('Are you sure you want to delete this image?');
    if (confirmDelete) {
      // Call your function to delete the image here
      deleteImage(image.id);
    }
  }}
>
                <CardMedia
                  component="img"
                  height="340"
                  image={image.data}
                  alt="Uploaded"
                />
              </Card>
            </GridItem>
          ))}
        </GridDropZone>
       
      </GridContextProvider>
       <button  onClick={handleDownloadClick}>Download Image</button>
      </Box>      
     
    </Box>
  );
}
