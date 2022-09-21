export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white"
  }
  let face = ''
  if(props.value === 1) {
    face = `<h2 class='die-num die-count-1'><span class='dot'></span></h2>`
  }
  else if(props.value === 2) {
    face = `<h2 class='die-num die-count-2'><span class='dot'></span><span class='dot'></span></h2>`
  }
  else if(props.value === 3) {
    face = `<h2 class='die-num die-count-3'><span class='dot'></span><span class='dot'></span><span class='dot'></span></h2>`
  }
  else if(props.value === 4) {
    face = `<h2 class='die-num die-count-4'><div class="column"><span class="dot"></span><span class="dot"></span></div><div class="column"><span class="dot"></span><span class="dot"></span></div></h2>`
  }
  else if(props.value === 5) {
    face = `<h2 class='die-num die-count-5'><div class="column"><span class="dot"></span><span class="dot"></span></div><div class="column"><span class="dot"></span></div><div class="column"><span class="dot"></span><span class="dot"></span></div></h2>`
  }
  else {
    face = `<h2 class='die-num die-count-6'><div class="column"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div><div class="column"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div></h2>`
  }
  return(
    <div
      className="die-face"
      style={styles}
      onClick={props.holdDice}
      dangerouslySetInnerHTML={{__html: (face)}}
    >
    </div>
  )
}