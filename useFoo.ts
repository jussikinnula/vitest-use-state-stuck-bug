import { useEffect, useRef, useState } from "react";

import useBar from "./useBar";

interface Structure {
  something: string;
  other: string[];
}

interface Foo {
  id: string;
  complex: {
    data: string;
    structures: Structure[];
  }
}

const useFoo = () => {
  const [foo, setFoo] = useState<Foo | undefined>(undefined);
  const [id, setId] = useState<string | undefined>(undefined);
  const [data, setData] = useState<string | undefined>(undefined);
  const [structure, setStructure] = useState<Structure | undefined>(undefined);
  const mounted = useRef(false);
  const bar = useBar();

  useEffect(() => {
    mounted.current = true;

    const timeout = window.setTimeout(() => {
      if (mounted.current) {
        setFoo({
          id: "Id",
          complex: {
            data: "Data",
            structures: [
              {
                something: "nice",
                other: ["things", "to", "do"] 
              },
              {
                something: "not-so-nice",
                other: ["nice", "to", "see"] 
              }
            ]
          }
        });
      }
    }, 250);

    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    setId(foo?.id);
    setData(foo?.complex.data);
    const structure = foo?.complex.structures.find(({ something }) => something === bar);
    setStructure(structure);
  }, [foo, bar]);

  return { id, data, structure };
};

export default useFoo;
