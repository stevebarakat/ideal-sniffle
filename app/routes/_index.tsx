import { Mixer } from "@/components/Mixer";
import { MixerMachineContext } from "@/context/MixerMachineContext";
import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";

function Index() {
  const fetcher = useFetcher();
  const namesQuery = fetcher.data;
  // resource route for loading server data
  useEffect(() => {
    if (fetcher.type === "init") {
      fetcher.load("/mixName/");
    }
  }, [fetcher]);

  const mixData = namesQuery?.mixData;

  return (
    <MixerMachineContext.Provider>
      <Mixer mixData={mixData} />
    </MixerMachineContext.Provider>
  );
}

export default Index;
